const express = require('express');
// middlewares
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/login/:userId', auth.encode, (req, res, next) => {
  return res.status(200).json({
    success: true,
    authorization: req.authToken,
  });
});

module.exports = router;
