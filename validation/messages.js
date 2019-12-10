const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, {min: 1, max: 300})) {
    errors.text = "Message must be between 1 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Message cannot be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}