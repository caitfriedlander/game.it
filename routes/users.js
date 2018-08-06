var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
router.post('/', usersCtrl.create);
router.get('/:id', usersCtrl.show);
router.delete('/:id', usersCtrl.delete);
router.get('/:id/beers/new', usersCtrl.newLibItem)
router.post('/:barId/beers/:beerId', usersCtrl.addLibItem)
router.delete('/:barId/beers/:beerId', usersCtrl.removeLibItem)

module.exports = router;
