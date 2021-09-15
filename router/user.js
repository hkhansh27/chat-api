const express = require('express');

const { body } = require('express-validator');

const userController = require('../controllers/user');
const router = express.Router();

router.get('/', userController.getAllUser);

router.get('/:id', userController.getUserById);

router.post(
  '/',
  [
    body('firstName').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),
    body('email')
      .trim()
      .not()
      .isEmpty()
      .isEmail()
      .withMessage('Please enter a valid email.')
      // .custom((value, { req }) => {
      //   return User.findOne({ email: value }).then((userDoc) => {
      //     if (userDoc) {
      //       return Promise.reject("E-Mail address already exists!");
      //     }
      //   });
      // })
      .normalizeEmail(),
    body('userType')
      .trim()
      .custom((value, { req }) => {
        const isUserType = ['admin', 'user', 'support'].some(
          type => type === value
        );
        if (!isUserType)
          throw new Error("Must be one of 'admin', 'user' or 'support'");
        return true;
      }),
  ],
  userController.postCreateUser
);

router.put('/:id', userController.putUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
