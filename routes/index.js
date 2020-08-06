const path = require("path");
const router = require("express").Router();

//Import routes;
const apiRoutes = require("./apiRoutes");
const authRoutes = require("./authRoutes");

// API Routes
router.use("/api", apiRoutes);

//Authentication routes;
router.use("/", authRoutes);

// If no routes are hit, send the React app
router.use("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/../client/public/index.html"))
);

module.exports = router;