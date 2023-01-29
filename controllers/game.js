const Game = require('../models/game')
const User = require('../models/user')

const winningConditions = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinningConditions(state) {
    let winner = "",
        turns = 0;
    winningConditions.forEach((condition) => {
        const [a, b, c] = condition;
        turns +=
            state[a] != "" ? 1 : 0 + state[b] != "" ? 1 : 0 + state[c] != "" ? 1 : 0;
        if (state[a] != "" && state[a] === state[b] && state[a] === state[c]) {
            winner = state[a];
        }
    });
    if (winner != "") return winner;
    else if (turns == 9) return "draw";
    else return "none";
}

exports.invitation = async (req, res) => {
    let getUser = User.findOne({ email: req.body.username });
    console.log(req.body, getUser);
    if (!getUser)
        return res.send({ status: false, message: "invitation api not working" });
    else return res.send({ status: true, data: getUser, message: "working" });
};

exports.startgame = async (req, res) => {
    let userInfo = req.body;
    let fetchUser = User.findOne({ gameId: userInfo.gameId });
    return res.send({ turn: fetchUser.emailPlayer1 == userInfo.emailPlayer1 });
};

exports.invite = async (req, res) => {
    let gameInfo = req.body;
    if (
        !gameInfo.emailPlayer1 ||
        !gameInfo.emailPlayer2 ||
        gameInfo.emailPlayer1 == gameInfo.emailPlayer2
    ) {
        return res.send({ status: false, message: "Invalid Input" });
    }

    if (!(User.findOne({ email: gameInfo.emailPlayer1 }) && User.findOne({ email: gameInfo.emailPlayer2 }))) {
        return res.send({ status: false, message: "User not found" });
    }

    let newGame = new Game({
        emailPlayer1: gameInfo.emailPlayer1, // creator
        emailPlayer2: gameInfo.emailPlayer2, // invited
        state: ["", "", "", "", "", "", "", "", ""],
        gameId: Math.random().toString(26).slice(2),
    });

    player1data = await User.findOne({ email: gameInfo.emailPlayer1 });
    player2data = await User.findOne({ email: gameInfo.emailPlayer2 });


    player1data.gamePlayed.push(newGame.gameId);
    player2data.gamePlayed.push(newGame.gameId);
    await player1data.save();
    await player2data.save();

    newGame.save((err, Game) => {
        if (!err)
            return res.send({ status: true, message: "Game created successfully." });
        else {
            console.log(err);
            return res.send({ status: false, message: "unexpected network error" });
        }
    });
};

exports.start = async (req, res) => {
    let gameInfo = req.body;
    Game.findOne(
        {
            _id: gameInfo._id,
        },
        (err, data) => {
            winner = checkWinningConditions(data.state);
            Object.keys(gameInfo).forEach((key) => {
                data[key] = gameInfo[key];
            });
            data.result = winner;
            data.save((err, Game) => {
                if (!err)
                    return res.send({ status: true, message: "Changed successfully" });
                else {
                    console.log(err);
                    return res.send({
                        status: false,
                        message: "unexpected network error",
                    });
                }
            });
        }
    );
};