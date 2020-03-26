const jwt = require('jsonwebtoken');
const { secretHash, hashPassword } = require('../keys/prod');

// security middleware takes token from client and only if its verified, the rest of the operation can go on
module.exports = verifyToken = (req, res, next) => {
  let token;
  if (Array.isArray(req.body)) {
    token = req.body[0];
  } else {
    token = req.body.token;
  }
  try {
    const { pass } = jwt.verify(token, secretHash);
    if (pass === hashPassword) {
      next();
    } else {
      console.log('verifyToken did not pass');
      res.status(401).send('not verified');
    }
  } catch (e) {
    console.log('verifyToken did not pass');
    res.status(401).send('not verified');
  }
};
