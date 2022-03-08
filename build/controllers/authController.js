"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/schema/user"));
const token_1 = __importDefault(require("../models/schema/token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//authenticate log in credentials
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    try {
        user = (yield user_1.default.findOne({
            username: req.body.username,
        }));
        if (user === null)
            throw Error("User not found");
        return {
            user: user,
            success: yield bcrypt_1.default.compare(req.body.password, user.password),
        };
    }
    catch (err) {
        return { user: user, success: false, message: err.message };
    }
});
//authenticate log in credentials + assign access token
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authentication = yield authenticate(req, res);
    if (!authentication.success)
        return res.status(401).json({ message: "Login Failed." });
    var user = authentication.user;
    user.password = undefined;
    const accessToken = generateAccessToken(user);
    addValidToken(accessToken);
    res.status(200).json({ accessToken: accessToken });
});
//generate access token for logged in user
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
}
//add access token to list of valid tokens
const addValidToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = new token_1.default({
            token: token,
        });
        return yield accessToken.save();
    }
    catch (err) {
        return false;
    }
});
//validate token to authorize request
const authorizeToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers[`authorization`];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]);
    try {
        if (token === null)
            throw Error("Empty token");
        const validToken = yield token_1.default.findOne({ token: token });
        if (validToken === null)
            throw Error("Invalid token");
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
});
//revoke access token onLogout: remove access token from list of valid tokens
const revokeAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield token_1.default.remove({ token: req.body.token });
        return res.status(201).json({ messsage: "Token successfully revoked." });
    }
    catch (err) {
        return res.status(500).json({ messsage: err.message });
    }
});
exports.default = {
    authorizeToken,
    logIn,
    revokeAccessToken,
};
