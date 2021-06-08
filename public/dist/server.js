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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router"));
var mongoose_1 = __importDefault(require("mongoose"));
var helmet_1 = __importDefault(require("helmet"));
var http_1 = require("http");
var socketio = __importStar(require("socket.io"));
// express server & websocket config
var app = express_1.default();
var port = process.env.PORT || 8000;
app.set("port", port);
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use("/", router_1.default);
var httpServer = http_1.createServer(app);
var io = new socketio.Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
    }
});
io.sockets.on("connection", function (socket) {
    socket.on("join", function (room) {
        socket.join(room);
        socket.on("jwt", function (jwt) {
            socket.broadcast.to(room).emit("auth", jwt);
        });
    });
});
// database config
var mgURI = process.env.MG_URI;
mongoose_1.default.connect(mgURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose_1.default.connection;
// db.on("error", () => {
//   console.error.bind(console, "connection error:")
// })
// db.once("open", () => {
//   console.log("database connect")
// })
// start server
httpServer.listen(port, function () {
    console.log("run in " + port);
});
