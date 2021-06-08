"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var isEmpty_1 = __importDefault(require("./isEmpty"));
var validateRegister = function (data) {
    var errors = {};
    data.name = !isEmpty_1.default(data.name) ? data.name : '';
    data.email = !isEmpty_1.default(data.email) ? data.email : '';
    data.password = !isEmpty_1.default(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty_1.default(data.passwordConfirm) ? data.passwordConfirm : '';
    if (!validator_1.default.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must have between 6 and 30 chars';
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if (!validator_1.default.isLength(data.passwordConfirm, { min: 6, max: 30 })) {
        errors.passwordConfirm = 'Password must have between 6 and 30 chars';
    }
    if (!validator_1.default.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Password and Confirm Password must match';
    }
    if (validator_1.default.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Password confirmation is required';
    }
    return {
        errors: errors,
        isValid: isEmpty_1.default(errors)
    };
};
exports.default = validateRegister;
