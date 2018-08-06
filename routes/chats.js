var router = require('express').Router();
var chatsCtrl = require('../controllers/chats');

router.get('/', chatsCtrl.index);
router.get('/:id', chatsCtrl.show);

module.exports = router;