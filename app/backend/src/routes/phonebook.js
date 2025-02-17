const express = require('express');
const phonebookAPI = require("../controllers/phonebook/phonebookAPI");
const verifyUser = require("../middleware/verifyUser");

const router = express.Router();

router.use(verifyUser);

router.post("/api/phonebook", phonebookAPI.addRecord);
router.get("/api/phonebook", phonebookAPI.getRecords);
router.put("/api/phonebook", phonebookAPI.updateRecord)
router.delete("/api/phonebook/:id", phonebookAPI.deleteRecord);

module.exports = router;