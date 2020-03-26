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

const allowedWidths = 'number between 100 and 1000';

// as allowedPositionsArray have a space for better representation, we should validate the trimmed version
let trimmedAllowedPositionsArray = allowedPositionsArray.map(position =>
  position.trim()
);
// do some validation
const validateForm = (url, position, height, width) => {
  console.log('width and height are', height, width);

  let validateUrl =
    validator.isURL(url, { require_protocol: true }) &&
    validator.isLength(url, { min: 0, max: 600 });
  let validatePosition;
  // if validate position is not empty, do this validation, other pass true
  if (position.length > 0) {
    validatePosition = trimmedAllowedPositionsArray.includes(position.trim())
      ? true
      : false;
  } else {
    validatePosition = true;
  }
  // if height/width are empty, pass true, otherwise - validate its between 100 and 1000
  let validateHeight = height === '' ? true : height >= 100 && height <= 1000;
  let validationWidth = width === '' ? true : width >= 100 && width <= 1000;

  const validators = [
    validateUrl,
    validatePosition,
    validateHeight,
    validationWidth
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
