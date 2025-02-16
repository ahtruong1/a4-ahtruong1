const authenticationRouter = require("./authentication");
const phonebookRouter = require("./phonebook");

routers = {
    authentication: authenticationRouter,
    phonebook: phonebookRouter
}

module.exports = routers;