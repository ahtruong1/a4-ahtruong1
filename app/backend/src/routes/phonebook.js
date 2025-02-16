const express = require('express');
const phonebookAPI = require("../controllers/phonebook/phonebookAPI");
const verifyUser = require("../middleware/verifyUser");

const router = express.Router();

router.use(verifyUser);

router.post("/phonebook", phonebookAPI.addRecord);
router.get("/phonebook", phonebookAPI.getRecords);
router.put("/phonebook", phonebookAPI.updateRecord)
router.delete("/phonebook/:index", phonebookAPI.deleteRecord);

module.exports = router;