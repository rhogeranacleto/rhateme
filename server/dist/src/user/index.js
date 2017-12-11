"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
function initUser(server) {
    const userRoutes = [
        {
            method: 'GET',
            path: '/users',
            handler: middleware_1.UserMiddleware.getAll
        }
    ];
    server.route(userRoutes);
}
exports.initUser = initUser;
//# sourceMappingURL=index.js.map