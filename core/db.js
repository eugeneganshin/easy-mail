const mongoose = require("mongoose")
const keys = require('../config/keys')

mongoose
    .connect(keys.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection is successfull')
    })

module.exports = mongoose