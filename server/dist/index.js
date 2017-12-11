"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./src/Server");
const Database_1 = require("./src/Database");
Database_1.dbConnect();
Server_1.RHateMeServer.run();
//# sourceMappingURL=index.js.map