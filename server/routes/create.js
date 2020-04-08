const express = require('express');
const router = express.Router();
const db = require('../mysql/mysql');
const verifyToken = require('../middleware/verifyToken');
const {
  returnErrorField,
  validateForm
} = require('../../client/src/utils/modalUtils');
const { returnDefault } = require('../utils/utils');
// create entire url (including the url itself, position, width and height)
router.post('/create_url', verifyToken, async (req, res) => {
  let { vast_url, url_position, url_width, url_height } = req.body[1];
  // if width/height/position is empty, it gets the default (e.g 100/100/bottom_right)
  let [position, width, height] = returnDefault(
    url_position,
    url_width,
    url_height
  );
  // check if form is valid
  const valid = validateForm(vast_url, position, width, height)[0];
  if (valid) {
    try {
      const values = { vast_url, position, width, height };
      let sql = `INSERT INTO Vasts SET ?`;
      await db.query(sql, values, (err, result) => {
        // if there is any error with sql query
        if (err) {
          res.status(502).send(err);
        } else {
          res.status(200).send('succeeded');
        }
      });
      // error in try block
    } catch (err) {
      res.status(502).send(err);
    }
    // form is not valid
  } else {
    const errorField = returnErrorField(url, position, width, height);
    res.status(500).send({ payload: `invalid field ${errorField}` });
  }
});

module.exports = router;
