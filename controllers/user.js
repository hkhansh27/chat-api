const { validationResult } = require('express-validator');

exports.getAllUser = (req, res, next) => {
  return res.status(200).json({ success: true, message: 'Ok do it well!' });
};

exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  return res
    .status(200)
    .json({ success: true, message: `Ok do it well! ${id}` });
};

exports.postCreateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { firstName, lastName, email, userType } = req.body;
  const userPayload = { firstName, lastName, email, userType };
  return res.status(200).json({
    success: true,
    message: `Created user with name ${firstName}`,
    data: userPayload,
  });
};

exports.putUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
};
