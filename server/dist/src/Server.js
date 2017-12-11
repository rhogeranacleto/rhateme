"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("hapi");
const index_1 = require("./user/index");
class RHateMeServer {
    static run() {
        const server = new hapi_1.Server();
        server.connection({
            port: 8080,
            routes: {
                cors: true
            }
        });
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply('Olar');
            }
        });
        index_1.initUser(server);
        return server.start().then(() => {
            console.log('HE IS ALIVE! 🤖');
        });
    }
}
exports.RHateMeServer = RHateMeServer;
//# sourceMappingURL=Server.js.map