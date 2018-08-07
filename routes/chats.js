var router = require('express').Router();
var chatsCtrl = require('../controllers/chats');

router.get('/', chatsCtrl.index);
router.get('/:id', chatsCtrl.show);
router.post('/', chatsCtrl.create);

module.exports = router;