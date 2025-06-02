const mongoose = require("mongoose");
const config = require("../config/config");
mongoose.Promise = Promise;

console.log("DB URL: ", config.databaseUrl);

mongoose.connection.openUri(
    config.databaseUrl,
    function(err, db) {
        if (err) {
            console.error("Unable to connect to the server. Please start the server. Error: " + err);
        } else {
            console.log("Connected to DB successfully! URL: " + config.databaseUrl);
        }
    });
const db = mongoose.connection;

db.on("connecting",
    () => console.log("Mongoose connecting open to " + config.databaseUrl)
);

db.on("error",
    err => console.error("Mongoose connection error: " + err)
);

db.on("disconnected",
    () => console.warn("Mongoose connection disconnected")
);

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.warn("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});

module.exports = mongoose;
