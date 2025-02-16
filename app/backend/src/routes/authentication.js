const express = require("express");

const passport = require("../config/passport");

const router = express.Router();

router.post("/login", passport.authenticate("local"),
    (req, res) => {
    res.status(200).send("OK");
});

module.exports = router;