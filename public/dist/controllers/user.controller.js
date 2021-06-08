"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validateLogin_1 = __importDefault(require("../validation/validateLogin"));
var validateRegister_1 = __importDefault(require("../validation/validateRegister"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var user_model_1 = __importDefault(require("../models/user.model"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var handlebars = __importStar(require("handlebars"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, errors, isValid, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = validateRegister_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({
                            error: errors
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_model_1.default.find({ email: req.body.email }).exec()];
            case 2:
                user = _b.sent();
                if (user.length > 0) {
                    return [2 /*return*/, res.status(400).json({
                            error: { email: 'This email has already been registered' }
                        })];
                }
                return [2 /*return*/, bcryptjs_1.default.hash(req.body.password, 10, function (err, hashedPass) {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            });
                        }
                        var user = new user_model_1.default({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPass,
                        });
                        user.save()
                            .then(function (user) {
                            var token = jsonwebtoken_1.default.sign({
                                name: user.name,
                                userId: user._id
                            }, process.env.JWT_SECRET);
                            return res.status(200).json({
                                message: token
                            });
                        })
                            .catch(function (error) {
                            return res.status(400).json({
                                error: error
                            });
                        });
                    })];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({
                        error: error_1
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var logUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, errors, isValid, user_1, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = validateLogin_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json(errors)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_model_1.default.findOne({ email: req.body.email }).exec()];
            case 2:
                user_1 = _b.sent();
                if (!user_1) {
                    return [2 /*return*/, res.status(400).json({
                            email: 'Could not find email.',
                        })];
                }
                return [2 /*return*/, bcryptjs_1.default.compare(req.body.password, user_1.password, function (err, result) {
                        if (err) {
                            return res.status(400).json({
                                errorMessage: err,
                            });
                        }
                        if (result) {
                            var token = jsonwebtoken_1.default.sign({
                                id: user_1._id,
                                name: user_1.name,
                                avatarColor: user_1.avatarColor,
                                description: user_1.description
                            }, process.env.JWT_SECRET);
                            return res.status(200).json({
                                auth: true,
                                token: token,
                            });
                        }
                        else {
                            return res.status(400).json({
                                password: 'Password does not matched!',
                            });
                        }
                    })];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({ message: err_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var sendEmail2PasswordUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, filePath, source, template, replacements, htmlToSend, credentials, transporter, mailOptions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.default.find({ email: req.body.emailToReset }).exec()];
            case 1:
                user = _a.sent();
                if (user.length < 1) {
                    return [2 /*return*/, res.status(404).json({
                            error: "user not found"
                        })];
                }
                // TODO: create temporary ids generation to reset password
                // try sending an email with a link to reset the password 
                try {
                    token = jsonwebtoken_1.default.sign({ id: user[0]._id }, process.env.JWT_SECRET, { expiresIn: 60 * 5 });
                    filePath = path.join(__dirname, '../html_email/template.hbs');
                    source = fs.readFileSync(filePath, 'utf-8').toString();
                    template = handlebars.compile(source);
                    replacements = {
                        link: process.env.FRONTEND_URL + "/reset/" + token
                    };
                    htmlToSend = template(replacements);
                    credentials = {
                        user: process.env.EMAIL2SEND,
                        pass: process.env.PASSWORD2SEND
                    };
                    transporter = nodemailer_1.default.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: credentials
                    });
                    mailOptions = {
                        from: 'testandotermux@gmail.com',
                        to: req.body.emailToReset,
                        subject: 'no-reply',
                        html: htmlToSend
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.send(process.env.EMAIL2SEND);
                        }
                    });
                }
                catch (err) {
                    return [2 /*return*/, res.status(400).json({
                            error: err
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
var resetPasswordUser = function (req, res) {
    var token = req.params.token;
    var decodedJWT = jsonwebtoken_1.default.decode(token);
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(400).json({
                error: "your token inspired, try again"
            });
        }
        return bcryptjs_1.default.hash(req.body.password, 10, function (err, hashedNewPassword) {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            user_model_1.default.findByIdAndUpdate(decoded.id, { password: hashedNewPassword }, { useFindAndModify: false }, function (err, doc) {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                }
                return res.status(200).json({
                    message: doc
                });
            });
        });
    });
};
exports.default = {
    createUser: createUser,
    logUser: logUser,
    sendEmail2PasswordUser: sendEmail2PasswordUser,
    resetPasswordUser: resetPasswordUser,
};
