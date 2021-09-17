const express = require('express');

// controllers
const userController = require('../controllers/user');
// middlewares

const router = express.Router();

router.get('/', userController.onGetAllUsers);
router.post('/', userController.onCreateUser);
router.get('/:id', userController.onGetUserById);
router.delete('/:id', userController.onDeleteUserById);

module.exports = router;
