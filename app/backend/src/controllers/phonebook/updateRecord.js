const client = require("../../config/database");
const config = require("../../config/config");
const insultDictionary = require("../../data/descriptionDictionary");

// Updates a record from the phonebook
async function updateRecord(req, res) {
    // Get updated record from request
    const record = req.body;

    try {
        // Update matching record from database
        const result = await client.db(config.DB_NAME).collection(config.COLLECTION_NAME).updateOne({
                _id: req.user._id, "phonebook.index": parseInt(record.index)
            }, {
                $set: {
                    "phonebook.$.firstName": record.firstName,
                    "phonebook.$.lastName": record.lastName,
                    "phonebook.$.phoneNumber": record.phoneNumber,
                    "phonebook.$.major": record.major,
                    "phonebook.$.note": insultDictionary.get(record.major)
                }
        });

        const updatedRecord = await client.db(config.DB_NAME).collection(config.COLLECTION_NAME).findOne({_id: req.user._id, "phonebook.index": parseInt(record.index)});

        if(result.modifiedCount) {
            res.status(200).json(updatedRecord.phonebook);
        }
        else {
            res.status(404).send("Record not found");
        }
    } catch (err) {
        res.status(500).send("Error updating record");
    } finally {
        res.end();
    }
}
module.exports = updateRecord;