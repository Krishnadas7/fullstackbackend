"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../../utils/statusCodes");
class ErrorResponse extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
    static badRequest(msg) {
        return new ErrorResponse(statusCodes_1.StatusCodes.BAD_REQUEST, msg);
    }
    static unauthorized(msg) {
        return new ErrorResponse(statusCodes_1.StatusCodes.UNAUTHORIZED, msg);
    }
    static forbidden(msg) {
        return new ErrorResponse(statusCodes_1.StatusCodes.FORBIDDEN, msg);
    }
    static notFound(msg = "Not found") {
        return new ErrorResponse(statusCodes_1.StatusCodes.NOT_FOUND, msg);
    }
    static internalError(msg) {
        return new ErrorResponse(statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, msg);
    }
}
exports.default = ErrorResponse;
