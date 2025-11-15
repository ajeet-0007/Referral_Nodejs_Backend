const express = require('express');

const router = express.Router();

const { createUser, createTransaction, getEarningsOfUser, getAppMetrics } = require('../controller/referralLogic')

router.post('/create-user', createUser)

router.post('/transaction', createTransaction)

router.post('/earnings/:userId', getEarningsOfUser)

router.get('/app-metrics', getAppMetrics);

module.exports = router;