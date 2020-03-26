const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const e = 'error while trying to';
const db = require('../mysql/mysql');

const {
  validationOrder,
  validateForm
} = require('../../client/src/utils/modalUtils');

// create entire url (including the url itself, position, width and height)
router.post('/create_url', verifyToken, async (req, res) => {
  const op = 'create url';
  const { vast_url, position, width, height } = req.body[1];
  const valid = validateForm(vast_url, position, width, height)[0];
  // if data is valid, valid is true
  if (valid) {
    try {
      //
      const values = { vast_url, position, width, height };
      let sql = `INSERT INTO Vasts SET ?`;
      await db.query(sql, values, (err, result) => {
        err ? console.log(e, op, err) : result;
      });
      res.status(200).send(`${op}, succeeded`);
    } catch (err) {
      res.status(500).send(e, op, 'server side', err);
    }
  } else {
    const validationArray = validateForm(url, position, width, height)[1];
    const errorIndex = validationArray.indexOf(false);
    const errorField = validationOrder[errorIndex];
    console.log(`validation failed, problem with field ${errorField}`);
    res.status(500).send(`problem with form validation in ${errorField} field`);
  }
});

module.exports = router;
