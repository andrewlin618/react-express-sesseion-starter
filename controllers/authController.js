const users = require('../data/users.json')

module.exports = {
    login: (req, res) => {
        const user = users.find(user => user.username === req.body.username);
        console.log(user);
        if (!user) {
            return res.status('400').send("Username doesn't exist!");
        }
        if (user.password !== req.body.password) {
            return res.status('403').send('Password is incorrect!');
        }
        req.session.user = { username: user.username, password: user.password };
        return res.send(user);
    },

    logout: (req, res) => {
        req.session.destroy();
        res.send('Logout succeeded.')
    },

    signUp: function (req, res) {
        const user = users.find((user) => user.username === req.body.username);
        if (user) {
            res.status('400').send("Username already exists.");
        }
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            permission: "basic",
            birthday: "unknown",
            nationality: "unknown",
            avatar_url: "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
        };
        users.push(newUser);
        req.session.user = {username: newUser.username, password : newUser.password};
        return res.send(newUser);
    },

    changePassword: function (req, res) {
        // TODO:
    },

    deleteAccount: function (req, res) {
        // TODO:
    }
}