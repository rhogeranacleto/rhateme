"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
class UserMiddleware {
    static getAll(request, reply) {
        controller_1.UserController.getAll().then(users => {
            reply(users);
        });
    }
}
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=middleware.js.map