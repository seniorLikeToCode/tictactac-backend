const router = require("express").Router();
const userController = require("../controllers/user");
const gameController = require("../controllers/game");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/start", gameController.start);
router.post("/invite", gameController.invite);
router.post("/invitation", gameController.invitation);
router.post("/startGame", gameController.startgame);
router.post('/gamedata', gameController.gamedata);

module.exports = router;
