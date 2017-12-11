"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./user/model");
const Mongoose = require("mongoose");
function dbConnect() {
    Mongoose.Promise = global.Promise;
    Mongoose.connect(process.env.DB || 'mongodb://localhost:27017/rhateme', {
        useMongoClient: true
    });
    const mongoDb = Mongoose.connection;
    mongoDb.on('error', () => {
        console.log(`Unable to connect to database`);
    });
    mongoDb.once('open', () => {
        console.log(`Connected to database!`);
    });
    return {
        User: Mongoose.model('User', model_1.UserSchema)
    };
}
exports.dbConnect = dbConnect;
//# sourceMappingURL=Database.js.map