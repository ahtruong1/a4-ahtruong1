/**
 * Configures passport for authentication
 */

const { ObjectId } = require("mongodb");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const client = require("./database");
const config = require("./config.js");

// Stores a piece of user data into the session
passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

// Fetches user from database using key stored in session
passport.deserializeUser(async (userID, done) => {
    try {
        const user = await client.db(config.DB_NAME).collection(config.COLLECTION_NAME).findOne({ _id: new ObjectId(userID) });
        if (!user) throw new Error("User not found");
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Set up local authentication strategy
passport.use(new LocalStrategy({
    usernameField: "email"
}, async function verify(email, password, done) {
    try {
        // Fetch user from database
        const user = await client.db(config.DB_NAME).collection(config.COLLECTION_NAME).findOne({ email: email });
        if (!user) throw new Error("User not found");

        // Validate password
        if (password === user.password) { // Correct password
            done(null, user);
        } else { // Incorrect password
            done(null, false);
        }
    } catch (error) {
        done(error, null);
    }
}));

module.exports = passport;