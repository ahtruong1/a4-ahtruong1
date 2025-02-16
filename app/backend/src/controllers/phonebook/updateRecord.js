const client = require("../../config/database");
const config = require("../../config/config");
const descriptionDictionary = require("../../data/descriptionDictionary");

// Updates a record from the phonebook
async function updateRecord(req, res) {
    // Get updated record from request
    const record = req.body;

    try {
        // Update matching record from database
        const result = await client.db(config.DB_NAME).collection(config.COLLECTION_NAME).updateOne({
                _id: req.user._id, "phonebook.studentID": record.studentID // Match user and record
            }, {
                $set: {
                    "phonebook.$.studentID": record.studentID,
                    "phonebook.$.fullName": record.fullName,
                    "phonebook.$.phoneNumber": record.phoneNumber,
                    "phonebook.$.major": record.major,
                    "phonebook.$.description": descriptionDictionary.get(record.major)
                }
        });
        if (result.modifiedCount) res.status(200).send("OK");
        else res.status(404).send("Record not found");
    } catch (err) {
        res.status(500).send("Error updating record");
    }
}
module.exports = updateRecord;