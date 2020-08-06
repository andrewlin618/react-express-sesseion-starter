const users = require('../data/users.json')

module.exports = {
    isAuthenticated: (req, res, next) => {
        if(!req.session.user) {
            return res.status('400').send('You have not logged in yet.')
        }
        const user = users.find(user => user.username === req.session.user.username)

        if (!user || user.password !== req.session.user.password) {
            return res.status('401').send("There some problems with your username and password, please log in again.");
        }
        req.local = user;
        next();
    },
    isAdmin: (req, res, next) => {
        if(!req.session.user) {
            return res.status('400').send('You have not logged in yet.')
        }
        const user = users.find(user => user.username === req.session.user.username)
        if (!user || user.password !== req.session.user.password) {
            return res.status('401').send("There some problems with your username and password, please log in again.");
        }
        if (user.permission === 'basic') {
            return res.status('403').send("You doesn't have permission!");
        }
        next();
    }
}