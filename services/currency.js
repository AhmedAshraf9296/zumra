const axios = require('axios');
const APPID = '9d4799ece577ad2d95a80f2b';
async function getExchangeRate(from, to, value) {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${APPID}/pair/${from}/${to}/${value}`);
    return response.data;
  } catch (error) {
    throw new Error({message:'Failed to fetch exchange rate',error:error});
  }
}

module.exports = { getExchangeRate };
