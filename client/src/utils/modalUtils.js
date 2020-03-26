// validator package
const validator = require('validator');

// posisble positions
const allowedPositionsArray = [
  'top_left',
  ' top_middle',
  ' top_right',
  ' middle_left',
  ' middle_right ',
  ' bottom_left',
  ' bottom_middle',
  ' bottom_right'
];

// returns the items in allowedPositionsArray
const returnAllowedPositions = () => {
  return allowedPositionsArray.map(option => option);
};

// order of validation as a helper to find the right invalid field
const validationOrder = ['url', 'position', 'width', 'height'];

const allowedWidths = 'numbers between 100 and 1000';

// do some validation
const validateForm = (url, position, height, width) => {
  let validateUrl =
    validator.isURL(url, { require_protocol: true }) &&
    validator.isLength(url, { min: 0, max: 600 });
  let validatePosition =
    allowedPositionsArray
      .map(pos => position === pos)
      .filter(bool => bool === true).length > 0
      ? true
      : false;
  let validateHeight = height >= 100 && height <= 1000;
  let validateWidth = width >= 100 && width <= 1000;

  const validators = [
    validateUrl,
    validatePosition,
    validateHeight,
    validateWidth
  ];

  // check wether all validators array returns true (e.g all is valid)
  const valid =
    validators.filter(value => value !== true).length === 0 ? true : false;

  return [valid, validators];
};
module.exports = {
  allowedPositionsArray,
  returnAllowedPositions,
  validationOrder,
  allowedWidths,
  validateForm
};
