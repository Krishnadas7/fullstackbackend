
interface ICloudinary{
    imageUpload(file:any,eventId:any):Promise<string>;
    getImage(eventId:string): Promise<string>;
}

export default ICloudinary