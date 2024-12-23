const User = require('../models/user');
const Transaction = require('../models/transaction');
const Earning = require('../models/earnings');

exports.createUser = async (req, res) => {
    try {
        const { parentId } = req.body;

        // Validate parent referrals
        const parent = await User.findByPk(parentId);
        if (parent && parent.directReferralsCount >= 8) {
            return res.status(400).json({ error: 'Referral limit exceeded' });
        }

        const user = await User.create({ parentId: parentId || null });
        if (parent) {
            parent.directReferralsCount++;
            await parent.save();
        }
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}


exports.createTransaction = async (req, res) => {
    try {

        const { userId, amount } = req.body;

        const eligibleForProfit = amount > 1000;
        const transaction = await Transaction.create({ userId, amount, eligibleForProfit });

        if (eligibleForProfit) {
            const user = await User.findByPk(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            // Direct profit (Level 1)
            const parent = await User.findByPk(user.parentId);
            if (parent && parent.status === 'active') {
                let directEarning= await Earning.create({
                    userId: parent.userId,
                    transactionId: transaction.transactionId,
                    profitPercentage: 5,
                    amount: (5 / 100) * amount,
                    level: 1,
                });
                console.log(`user_${parent.userId}` , directEarning.Earning)
                req.io.to(`user_${parent.userId}`).emit('earning_update', {
                    message: 'New direct earning received!',
                    earning: directEarning,
                  });

                // Indirect profit (Level 2)
                const grandParent = await User.findByPk(parent.parentId);
                if (grandParent && grandParent.status === 'active') {
                    let indirectEarning= await Earning.create({
                        userId: grandParent.userId,
                        transactionId: transaction.transactionId,
                        profitPercentage: 1,
                        amount: (1 / 100) * amount,
                        level: 2,
                    });
                    console.log(indirectEarning)
                    req.io.to(`user_${grandParent.userId}`).emit('earning_update', {
                        message: 'New indirect earning received!',
                        earning: indirectEarning,
                      });
                }
            }
        }

        res.status(201).json(transaction);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}

exports.getEarningsOfUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const earnings = await Earning.findAll({ where: { userId } });
        res.json(earnings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
