const express = require('express');
const router = express.Router();
const { getExchangeRate } = require('../services/currency');
const Transaction = require('../models/transactionModel');
const  {authenticateUser,generateSecretKey} =require('../middleware')
const jwt = require('jsonwebtoken');

router.route('/convert').post(authenticateUser,async (req, res) => {
  try {
    const {amount, sourceCurrency, targetCurrency } = req.body;
    const userId = req.userId
    console.log('userIduserId',userId)
    // Fetch the exchange rate
    const exchangeRate = await getExchangeRate(sourceCurrency, targetCurrency, amount);
    console.log("exchangeRate",exchangeRate)
    // Calculate the converted amount
    // const convertedAmount = amount * exchangeRate;
    const convertedAmount = exchangeRate.conversion_result;
    // Save the transaction to the database
    const currencyExchange =  await Transaction.create({
      userId,
      amount,
      sourceCurrency,
      targetCurrency,
      convertedAmount
    });

    res.json({ currencyExchange });
  } catch (error) {
    console.error(error);
    // Check for specific errors (e.g., token expiration) and handle accordingly
    res.status(401).json({ message: 'Failed to authenticate user or convert currency',error:error });
  }
});

module.exports = router;
