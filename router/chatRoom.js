const express = require('express');
// controllers
const chatRoom = require('../controllers/chatRoom.js');

const router = express.Router();

router.get('/', chatRoom.getRecentConversation);
router.get('/:roomId', chatRoom.getConversationByRoomId);
router.post('/initiate', chatRoom.initiate);
router.get('/getRooms', chatRoom.getChatRooms);
router.post('/:roomId/message', chatRoom.postMessage);
router.put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId);

module.exports = router;
