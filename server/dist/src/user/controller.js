"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
class UserController {
    static getAll() {
        return model_1.UserModel.find();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map