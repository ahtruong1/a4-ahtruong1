const client  = require("../../config/database.js");
const config = require("../../config/config");

// Deletes a record from the phonebook
async function deleteRecord(req, res) {
    // Get ID of student record to be deleted from URL
    const studentID = req.params.id;

    try {
        // Delete the record from user's phonebook
        const result = await client.db(config.DB_NAME).collection(config.COLLECTION_NAME).updateOne(
            { _id: req.user._id }, // Match user
            { $pull: { phonebook: { studentID: studentID } } }  // Match record
        );
        if (result.modifiedCount) res.status(200).send("OK");
        else res.status(404).send("Record not found.");
    } catch (err) {
        res.status(500).send("Error deleting record");
    }
}

module.exports = deleteRecord;