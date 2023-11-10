const crypto = require('crypto');
const jwt = require('jsonwebtoken');
let secretKey;

function authenticateUser(req, res, next) {
    const token = req.headers.authorization;
  console.log('tokentokentokentokentokentokentokentoken',token)
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.userId = decoded.userId;
      next();
    });
  }
  const generateSecretKey = () => {
    secretKey =  crypto.randomBytes(32).toString('hex');
    return secretKey;
  };


module.exports = {
    authenticateUser,
    generateSecretKey
  };
  