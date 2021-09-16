const express = require('express');

// const { body } = require('express-validator');
// //controllers
const userController = require('../controllers/user');
// //middlewares
// const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', userController.onGetAllUsers);
router.post('/', userController.onCreateUser);
router.get('/:id', userController.onGetUserById);
router.delete('/:id', userController.onDeleteUserById);

module.exports = router;
