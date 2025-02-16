const client  = require("../../config/database.js");
const fs = require("fs");

// Gets the webpage that displays all phonebook records
async function getRecords(req, res) {
    // Get phonebook records from user
    const phonebook = req.user.phonebook;
    res.status(200).json(phonebook);
}

module.exports = getRecords;