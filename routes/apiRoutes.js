// const path = require("path");
const router = require("express").Router();
const users = require("../data/users.json");
const userController = require("../controllers/userController")
const {isAdmin, isAuthenticated} = require("../middleware/authMiddleware.js")

router.route("/users")
    .get(isAdmin, userController.getAllUsers);

router.route('/user/:username')
    .get(userController.getUserByUsername);

router.route('/test')
    .get((req, res) => {
        if (!req.session.viewCount) {
            req.session.viewCount = 0
        }
        req.session.viewCount++;
        res.send(`You have view this web ${req.session.viewCount} times.`);
    });

module.exports = router;
