const express = require('express');
const router = express.Router();
const e = 'error while trying to';
const { create } = require('xmlbuilder2');
const verifyToken = require('../middleware/verifyToken');
const db = require('../mysql/mysql');

router.get('/delete', async (req, res) => {
  let sql = 'delete from Vasts';
  const answer = await db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/get_urls', verifyToken, async (req, res) => {
  try {
    let sql = 'SELECT * FROM Vasts';
    await db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log('problem with fetching urls server side', err);
    res.status(500).send(e, 'server side', err);
    if (err) throw err;
    console.log('result is', result);
    res.send(result);
  }
});

router.get('/get_first', verifyToken, async (req, res) => {
  console.log('reached get first');

  try {
    let sql = 'SELECT * FROM Vasts where id = 10';
    await db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log('problem with getting first', err);
  }
});

// show the data in xml form, built according to the specification below.
router.get(`/show_xml`, async (req, res) => {
  try {
    const sql = 'SELECT * FROM Vasts where id = ?';
    const value = req.query.id;
    await db.query(sql, value, (err, result) => {
      if (err) console.log('err is', err);
      const data = result[0];
      if (data) {
        const root = create({ version: '1.0' })
          .ele('VAST', { version: '2.0' })
          .ele('Ad')
          .ele('Inline')
          .ele('AdSystems')
          .txt('2.0')
          .up()
          .ele('Impressions')
          .up()
          .ele('Creatives')
          .ele('Creative')
          .ele('Linear')
          .ele('MediaFiles')
          .up()
          .ele('MediaFile', {
            type: 'application/javascript',
            apiFramework: 'VPAID',
            height: `${data.height}`,
            width: `${data.width}`,
            delivery: 'progressive'
          })
          .dat(
            `https://cheq.com/vpaid.js?vast=${data.vast_url}&position=${data.position}&vastId=${data.id}`
          );
        const xml = root.end({ prettyPrint: true });
        res.set('Content-Type', 'text/xml');
        res.send(xml);
      } else {
        const root = create({ version: '1.0' })
          .ele('VAST', { version: '2.0' })
          .end({ allowEmpty: true });
        res.set('Content-Type', 'text/xml');
        res.send(root);
      }
    });
  } catch (err) {
    console.log('problem with fetching urls server side', err);
    res.status(500).send(e, 'server side', err);
    if (err) throw err;
  }
});

module.exports = router;
