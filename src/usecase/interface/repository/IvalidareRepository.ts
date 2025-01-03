export interface ValidationResult{
    success:boolean;
    message:string;
}
export interface IRequestValidator {
    validateRequiredFields(
        data:Record<string,any>,
        requireFields: string[]
    ):ValidationResult;
}