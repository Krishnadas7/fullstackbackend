interface INodemailer {
    generateOTP(email: string): string;
    sendEmailVerification(first_name: string, username: string): Promise<string>;
    sendMessageToEmail(email: string, first_name: string,status:string): Promise<string>;
    verifyEmail(enteredOTP: string, email: string): Promise<boolean>;
    sendEmailforForgotPassword(email:string,first_name:string):Promise<string|undefined>;
    sendEmailForCompanyRegistration(company_email:string,company_name:string):Promise<string| undefined>
    sendBulkEmail(event:string[],subject:string,message:string,url:string):Promise<string>;
  }
  
  export default INodemailer;