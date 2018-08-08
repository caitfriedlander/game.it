var router = require('express').Router();
var chatsCtrl = require('../controllers/chats');

router.get('/', chatsCtrl.index);
router.post('/rooms', chatsCtrl.createRoom);

module.exports = router;