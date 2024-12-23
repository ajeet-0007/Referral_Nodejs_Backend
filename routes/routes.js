const express = require('express');

const router = express.Router();

const { createUser, createTransaction, getEarningsOfUser } = require('../controller/referralLogic')

router.post('/create-user', createUser)

router.post('/transaction', createTransaction)

router.post('/earnings/:userId', getEarningsOfUser)

module.exports = router;