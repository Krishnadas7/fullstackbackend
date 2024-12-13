import { v2 as cloudinary } from 'cloudinary';
import ICloudinary from "../../usecase/interface/services/Icloudinary";


    cloudinary.config({ 
        cloud_name: 'dqss9skvg', 
        api_key: '419329579884329', 
        api_secret: 'sF5Cl26uVgowxSw5u-TI9gkzQnU' // Click 'View API Keys' above to copy your API secret
    });

class Cloudinary implements ICloudinary{
    async imageUpload(file:any,eventId:any): Promise<string> {
        console.log('image upload===',file);
        const imageAsBase64 = file.buffer.toString('base64');
        const dataURI = `data:text/plain;base64,${imageAsBase64}`;
        const uploadResult = await cloudinary.uploader
        .upload(
            dataURI,{
               public_id: eventId,
           }
        ).then((res)=>{
            console.log('res from cloudinary',res)
            return res.secure_url
        })
        .catch((error) => {
            
            return false
        });
      
      return uploadResult+''
     
    }
    async getImage(eventId:string): Promise<string> {
        const optimizeUrl = cloudinary.url(eventId, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        return optimizeUrl
    }
}

export default Cloudinary