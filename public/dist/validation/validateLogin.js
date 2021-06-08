"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var isEmpty_1 = __importDefault(require("./isEmpty"));
var validateLogin = function (data) {
    var errors = {};
    data.email = !isEmpty_1.default(data.email) ? data.email : '';
    data.password = !isEmpty_1.default(data.password) ? data.password : '';
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must have 6 and 30 characters';
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    return {
        errors: errors,
        isValid: isEmpty_1.default(errors)
    };
};
exports.default = validateLogin;
