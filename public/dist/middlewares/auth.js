"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __importDefault(require("../models/user.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth = function (req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({
            error: 'token not found!'
        });
    }
    try {
        var decoded_1 = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        var userId_1 = decoded_1.userId;
        user_model_1.default.findById(userId_1)
            .then(function (responseUserId) {
            if (userId_1 === null) {
                return res.status(400).json({
                    error: 'not authorized!'
                });
                return next();
            }
            else {
                return next();
            }
        })
            .catch(function (error) {
            return res.status(400).json({
                error: decoded_1
            });
        });
    }
    catch (error) {
        return res.status(400).json({
            error: error
        });
    }
};
exports.default = auth;
