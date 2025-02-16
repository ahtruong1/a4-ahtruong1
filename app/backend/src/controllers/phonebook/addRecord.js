const client = require("../../config/database");
const config = require("../../config/config");
const insultDictionary = require("../../data/insultDictionary");

async function addRecord(req, res) {
    // Get record from request & add derived fields
    const record = await addFields(req.body, req.user._id);

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

// Adds an index and note to a record
async function addFields(record, userID) {
    const phonebook = client.db(config.DB_NAME).collection(config.COLLECTION_NAME);

    // Determine greatest index
    const greatestIndex = (
        await phonebook
            .aggregate([
                { $unwind: "$phonebook" },
                { $sort: { "phonebook.index": -1 } },
                { $limit: 1 }
            ]).toArray())[0].phonebook.index;

    // Add fields
    record.index = greatestIndex + 1;
    record.note = insultDictionary.get(record["major"]);
    return record;
}

module.exports = addRecord;