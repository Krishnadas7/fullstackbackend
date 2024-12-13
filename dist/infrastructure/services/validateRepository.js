"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
class RequestValidator {
    validateEmail(email) {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                message: "Invalid email format",
            };
        }
        return { success: true, message: "" };
    }
    validateRequiredFields(data, requiredFields) {
        for (const field of requiredFields) {
            if (data[field] === undefined) {
                return {
                    success: false,
                    message: `Missing required parameter: ${field}`,
                };
            }
            if (field === "email") {
                const emailValidationResult = this.validateEmail(data[field]);
                if (!emailValidationResult.success) {
                    return emailValidationResult;
                }
            }
        }
        return { success: true, message: "" };
    }
}
exports.RequestValidator = RequestValidator;
exports.default = RequestValidator;
