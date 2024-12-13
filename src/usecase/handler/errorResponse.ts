import { StatusCodes } from "../../utils/statusCodes";

class ErrorResponse extends Error {
    status: number;
    message: string;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
    }
  
    static badRequest(msg: string): ErrorResponse {
      return new ErrorResponse(StatusCodes.BAD_REQUEST, msg);
    }
  
    static unauthorized(msg: string): ErrorResponse {
      return new ErrorResponse(StatusCodes.UNAUTHORIZED, msg);
    }
  
    static forbidden(msg: string): ErrorResponse {
      return new ErrorResponse(StatusCodes.FORBIDDEN, msg);
    }
  
    static notFound(msg: string = "Not found"): ErrorResponse {
      return new ErrorResponse(StatusCodes.NOT_FOUND, msg);
    }
  
    static internalError(msg: string): ErrorResponse {
      return new ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, msg);
    }
  }
  
  export default ErrorResponse;
  