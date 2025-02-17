const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const routers = require("./src/routes/routers");

const app = express();
const PORT = 3000;

app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}));

app.use(session({
   secret: "cs4241-a4",
   resave: false,
   saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.use(express.json());

app.use(routers.authentication);
app.use(routers.phonebook);

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`);
});