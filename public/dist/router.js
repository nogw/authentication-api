"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("./controllers/user.controller"));
var router = express_1.default.Router();
router.route("/register")
    .post(user_controller_1.default.createUser);
router.route("/login")
    // .all(auth)
    .post(user_controller_1.default.logUser);
router.route("/reset")
    .post(user_controller_1.default.sendEmail2PasswordUser);
router.route("/reset/password/:token")
    .post(user_controller_1.default.resetPasswordUser);
exports.default = router;
