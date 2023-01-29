const User = require('../models/user')

exports.register = async (req, res) => {
    let userInfo = req.body
    
    if (!userInfo.email || !userInfo.password || !userInfo.name || !userInfo.username) {
        return res.send({"status" : false, "message": "Invalid Input" });
    }

    else {
        User.findOne({ email: userInfo.email }, (err, data) => {
            if (data) return res.send({"status" : false, "message": "Email is already used." });
            let newUser = new User({
                email: userInfo.email,
                username: userInfo.username,
                name: userInfo.name,
                password: userInfo.password,
                gamePlayedId: []
            })

            newUser.save((err, User) => {
                if (!err) return res.send({"status" : true, "message": "Successfully registered."})
                else {
                    console.log(err)    
                    return res.send({"status": false, "message": "unexpected network error" })
                }
            })
        })
    }
}

exports.login = async (req, res) => {
    User.findOne({ username: req.body.username }, (err, data) => {
        if (!data) return res.send({ "status": false,"popup": 'block' , "message": "User not found" });
        if (data.password == req.body.password) return res.send({ "status": true, "popup": 'none' , "message": "Successfully logged in" })
        else return res.send({ "status": false,"popup":'block', "message": "Incorrect password" })
    })
}