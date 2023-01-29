const router = require('express').Router()
const userController = require('../controllers/user')
const gameController = require('../controllers/game')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/home/start', gameController.start)
router.post('/home/invite', gameController.invite)
router.post('/home/startGame', gameController.startgame)

module.exports = router