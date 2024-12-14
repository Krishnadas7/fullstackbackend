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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdapter = void 0;
class UserAdapter {
    constructor(userusecase) {
        this.userusecase = userusecase;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userusecase.createUser(req.body);
                if (newUser) {
                    res.status(newUser.status).json({
                        success: newUser.success,
                        message: newUser.message,
                        user: newUser.data,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userusecase.loginUser(req.body);
                console.log('user====', user);
                if (user) {
                    res.cookie("userAccessToken", user.userAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 900000
                    });
                    res.cookie("userRefreshToken", user.userRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
                    });
                }
                res.status(user.status).json({
                    success: user.success,
                    data: user.data,
                    message: user.message,
                    userAccessToken: user.userAccessToken,
                    userRefreshToken: user.userRefreshToken
                });
            }
            catch (error) {
                // Handle errors
                next(error);
            }
        });
    }
    googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userusecase.googleAuth(req.body);
                if (user) {
                    res.cookie("userAccessToken", user.userAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 900000
                    });
                    res.cookie("userRefreshToken", user.userRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
                    });
                }
                res.status(user.status).json({
                    success: user.success,
                    data: user.data,
                    message: user.message,
                    accessToken: user.userAccessToken,
                    refreshToken: user.userRefreshToken
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendOtpForgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userusecase.sendEmailFogotPassword(req.body);
                res.status(user.status).json({
                    success: user.success,
                    message: user.message,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    tokenValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.userusecase.tokenValidation(req.body);
                res.status(token.status).json({
                    success: token.success,
                    message: token.message
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userusecase.verifyEmail(req.body);
                res.status(user.status).json({
                    success: user.success,
                    message: user.message,
                });
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    emailVerification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const user = yield this.userusecase.emailVeification(req.body);
                user &&
                    res.status(user.status).json({
                        success: user.success,
                        // data: user.data,
                        message: user.message,
                    });
            }
            catch (err) {
                next(err);
            }
        });
    }
    sendEmailForgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userAccessToken = req.cookies.userAccessToken;
                const user = yield this.userusecase.sendEmailFogotPassword(req.body);
                res.status(user.status).json({
                    success: user.success,
                    message: user.message,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    fogotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userusecase.forgotPassword(req.body);
                newUser &&
                    res.cookie("userjwt", newUser, {
                        httpOnly: true,
                        sameSite: "none", // Prevent CSRF attacks
                        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                    });
                res.status(newUser.status).json({
                    success: newUser.success,
                    message: newUser.message,
                    user: newUser.data,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    profileImageUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.file);
                const obj = {
                    image: req.file,
                    id: req.body.id,
                    email: req.body.email
                };
                const imageUpdate = yield this.userusecase.uploadProfileImage(obj);
                res.status(imageUpdate.status).json({
                    success: imageUpdate.success,
                    message: imageUpdate.message,
                    data: imageUpdate.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordUpdated = yield this.userusecase.resetPassword(req.body);
                res.status(passwordUpdated.status).json({
                    success: passwordUpdated.success,
                    message: passwordUpdated.message,
                    data: passwordUpdated.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    profileUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.userAccessToken;
            console.log('user access token from adapter', token);
            const { first_name, last_name, qualification, bio, socialmedialink1, socialmedialink2 } = req.body;
            let obj = {
                first_name,
                last_name,
                qualification,
                bio,
                socialmedialink1,
                socialmedialink2,
                token
            };
            try {
                req.body.token = token;
                const profileUpdate = yield this.userusecase.updateProfile(obj);
                res.status(profileUpdate.status).json({
                    success: profileUpdate.success,
                    message: profileUpdate.message,
                    data: profileUpdate.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    userData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.query.email;
                const user = yield this.userusecase.userData(email);
                res.status(user.status).json({
                    success: user.success,
                    message: user.message,
                    data: user.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getRandomUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const user = yield this.userusecase.getRandomUser(userId);
                res.status(user.status).json({
                    success: user.success,
                    message: user.message,
                    data: user.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.query.email;
                const getUserImage = yield this.userusecase.getImage(email);
                return res.status(getUserImage.status).json({
                    success: getUserImage.success,
                    message: getUserImage.message,
                    data: getUserImage.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    memberexist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const email = req.query.email;
                const member = yield this.userusecase.memberExist(userId, email);
                return res.status(member.status).json({
                    success: member.success,
                    message: member.message,
                    data: member.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getN = yield this.userusecase.getNotification(req.cookies.userRefreshToken);
                return res.status(getN.status).json({
                    success: getN.success,
                    message: getN.message,
                    data: getN.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    allUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userusecase.allUsers();
            return res.status(users.status).json({
                success: users.success,
                message: users.message,
                data: users.data
            });
        });
    }
    createReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield this.userusecase.createReport(req.body);
                return res.status(report.status).json({
                    success: report.success,
                    message: report.message,
                    data: report.data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    userRefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const incomingRefreshToken = req.body.refreshToken;
                const tokens = yield this.userusecase.userRefreshToken(incomingRefreshToken);
                const accessToken = (_a = tokens.data) === null || _a === void 0 ? void 0 : _a.accessToken;
                const refreshToken = (_b = tokens.data) === null || _b === void 0 ? void 0 : _b.refreshToken;
                res.status(tokens.status)
                    .cookie("userAccessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 900000
                })
                    .cookie("userRefreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
                    .json({ accessToken, refreshToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserAdapter = UserAdapter;
