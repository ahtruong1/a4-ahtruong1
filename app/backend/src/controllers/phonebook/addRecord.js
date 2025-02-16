const client = require("../../config/database");
const config = require("../../config/config");
const descriptionDictionary = require("../../data/descriptionDictionary");

// Adds a record to the phonebook
async function addRecord(req, res) {
    // Add description field
    const record = addDescription(req.body);

    try {
        // Add record to database
        await client.db(config.DB_NAME).collection(config.COLLECTION_NAME).updateOne(
            { _id: req.user._id },
            { $push: { phonebook: record } });
        res.status(200).json(record);
    } catch (err) {
        res.status(500).send("Error creating record");
    }
}

// Adds a description to a new record
function addDescription(record) {
    record.description = descriptionDictionary.get(record["major"]);
    return record;
}

module.exports = addRecord;