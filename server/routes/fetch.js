const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const db = require('../mysql/mysql');
const { genFullXml, genEmptyXml } = require('../utils/utils');

router.post('/get_urls', verifyToken, async (req, res) => {
  try {
    let sql = 'SELECT * FROM Vasts';
    await db.query(sql, (err, result) => {
      if (err) {
        res.status(502).send(err);
      } else {
        res.send(result);
      }
    });
  } catch (err) {
    res.status(503).send(err);
  }
});

// show the data in xml form, built according to the specification below.
router.get(`/show_xml`, async (req, res) => {
  try {
    const sql = 'SELECT * FROM Vasts where id = ?';
    const value = req.query.id;
    await db.query(sql, value, (err, result) => {
      if (err) {
        res.status(502).send(err);
      } else {
        const data = result[0];
        if (data) {
          const xml_constructed = genFullXml(data);
          res.set('Content-Type', 'text/xml');
          res.send(xml_constructed);
        } else {
          const empty_xml = genEmptyXml();
          res.set('Content-Type', 'text/xml');
          res.send(empty_xml);
        }
      }
    });
  } catch (err) {
    res.status(501).send(err);
  }
});

router.get('/delete', async (req, res) => {
  let sql = 'delete from Vasts';
  await db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;

// not part of the assignment
