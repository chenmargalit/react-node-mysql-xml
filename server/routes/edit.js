const express = require('express');
const router = express.Router();
const db = require('../mysql/mysql');

const verifyToken = require('../middleware/verifyToken');
const {
  validationOrder,
  validateForm
} = require('../../client/src/utils/modalUtils');

// edit url function. Unfortunately this currently replaces all fields, this of course should be further optimized.
router.patch('/edit_url', verifyToken, async (req, res) => {
  const { id, url, position, width, height } = req.body[1];
  const valid = validateForm(url, position, width, height)[0];
  if (valid) {
    try {
      const values = [url, position, width, height, id];
      console.log('widht in values is', width);
      let sql = `UPDATE Vasts SET vast_url = ?, position = ?, width = ?, height = ? WHERE id = ?`;
      await db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
      });
    } catch (e) {
      console.log('problem with patch on server side', e);
      res.status(500).send('problem with updating db');
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
