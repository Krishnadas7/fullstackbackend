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
exports.AdminAdapter = void 0;
class AdminAdapter {
    constructor(adminusecase) {
        this.adminusecase = adminusecase;
    }
    loginAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.adminusecase.loginAdmin(req.body);
                if (user) {
                    res.cookie('adminAccessToken', user.adminAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 900000
                    })
                        .cookie('adminRefreshToken', user.adminRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
                    });
                    res.status(user.status).json({
                        success: user.success,
                        data: user.data,
                        message: user.message,
                        adminAccessToken: user.adminAccessToken,
                        adminRefreshToken: user.adminRefreshToken
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.adminusecase.findAllUsers();
                res.status(user.status).json({
                    success: user.success,
                    data: user.data,
                    message: user.message
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    blockUnblock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.query._id;
                const user = yield this.adminusecase.blockUnblock(_id);
                user &&
                    res.status(user.status).json({
                        success: user.success,
                        data: user.data,
                        message: user.message,
                    });
            }
            catch (error) {
                next(error);
            }
        });
    }
    userCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userC = yield this.adminusecase.usersCount();
                userC &&
                    res.status(userC.status).json({
                        success: userC.success,
                        data: userC.data,
                        message: userC.message,
                    });
            }
            catch (error) {
                next(error);
            }
        });
    }
    eventCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventC = yield this.adminusecase.eventCount();
                eventC &&
                    res.status(eventC.status).json({
                        success: eventC.success,
                        data: eventC.data,
                        message: eventC.message,
                    });
            }
            catch (error) {
                next(error);
            }
        });
    }
    liveEventCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const liveC = yield this.adminusecase.liveEventCount();
                liveC &&
                    res.status(liveC.status).json({
                        success: liveC.success,
                        data: liveC.data,
                        message: liveC.message,
                    });
            }
            catch (error) {
                next(error);
            }
        });
    }
    piechartData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pData = yield this.adminusecase.piechartData();
                pData
                    &&
                        res.status(pData.status).json({
                            success: pData.success,
                            data: pData.data,
                            message: pData.message,
                        });
            }
            catch (error) {
                next(error);
            }
        });
    }
    filterUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterU = yield this.adminusecase.filterUser();
                filterU
                    &&
                        res.status(filterU.status).json({
                            success: filterU.success,
                            data: filterU.data,
                            message: filterU.message,
                        });
            }
            catch (error) {
                next(error);
            }
        });
    }
    completeReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.adminusecase.completeReport();
                data &&
                    res.status(data.status).json({
                        success: data.success,
                        data: data.data,
                        message: data.message,
                    });
            }
            catch (error) {
                next(error);
            }
        });
    }
    adminRefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const incomingRefreshToken = req.body.refreshToken;
                const Tokens = yield this.adminusecase.adminRefreshToken(incomingRefreshToken);
                const accessToken = (_a = Tokens.data) === null || _a === void 0 ? void 0 : _a.accessToken;
                const refreshToken = (_b = Tokens.data) === null || _b === void 0 ? void 0 : _b.refreshToken;
                res.status(Tokens.status)
                    .cookie("adminAccessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 900000
                })
                    .cookie("adminRefreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
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
exports.AdminAdapter = AdminAdapter;
