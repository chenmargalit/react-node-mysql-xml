const { create } = require('xmlbuilder2');

const returnDefault = (position, width, height) => {
  let newPosition = position === '' ? 'bottom_right' : position;
  let newWidth = width === '' ? 100 : width;
  let newHeight = height === '' ? 100 : height;
  return [newPosition, newWidth, newHeight];
};

const genFullXml = data => {
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
      `https://someCompany.com/vpaid.js?vast=${data.vast_url}&position=${data.position}&vastId=${data.id}`
    );
  const xml = root.end({ prettyPrint: true });
  return xml;
};

const genEmptyXml = () => {
  const root = create({ version: '1.0' })
    .ele('VAST', { version: '2.0' })
    .end({ allowEmpty: true });
  return root;
};

module.exports = {
  returnDefault,
  genFullXml,
  genEmptyXml
};
