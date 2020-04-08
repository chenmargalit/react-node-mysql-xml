const express = require('express');
const router = express.Router();
const db = require('../mysql/mysql');

const verifyToken = require('../middleware/verifyToken');
const {
  validateForm,
  returnErrorField
} = require('../../client/src/utils/modalUtils');
const { returnDefault } = require('../utils/utils');

// edit url function. Unfortunately this currently replaces all fields, this of course should be further optimized.
router.patch('/edit_url', verifyToken, async (req, res) => {
  let { id, url, url_position, url_width, url_height } = req.body[1];
  // if width/height/position is empty, it gets the default (e.g 100/100/bottom_right)
  let [position, width, height] = returnDefault(
    url_position,
    url_width,
    url_height
  );
  const valid = validateForm(url, position, width, height)[0];
  if (valid) {
    try {
      const values = [url, position, width, height, id];
      let sql = `UPDATE Vasts SET vast_url = ?, position = ?, width = ?, height = ? WHERE id = ?`;
      await db.query(sql, values, (err, result) => {
        // if there's an error with sql query
        if (err) {
          res.status(502).send(err);
        } else {
          res.status(200).send(result);
        }
      });
      // if there is any error in try block
    } catch (e) {
      res.status(501).send(err);
    }
    // form is not valid
  } else {
    const errorField = returnErrorField(url, position, width, height);
    res.status(500).send({ payload: `invalid field ${errorField}` });
  }
});

module.exports = router;
