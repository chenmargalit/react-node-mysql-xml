const jwt = require('jsonwebtoken');
const keys = require('../keys/prod');

const createJwt = () => {
  // create a jwt token, hashing the hashPassword string using the secretHash password
  return jwt.sign({ pass: keys.hashPassword }, keys.secretHash);
};

module.exports = {
  createJwt
};
