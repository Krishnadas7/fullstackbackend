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
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dqss9skvg',
    api_key: '419329579884329',
    api_secret: 'sF5Cl26uVgowxSw5u-TI9gkzQnU' // Click 'View API Keys' above to copy your API secret
});
class Cloudinary {
    imageUpload(file, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('image upload===', file);
            const imageAsBase64 = file.buffer.toString('base64');
            const dataURI = `data:text/plain;base64,${imageAsBase64}`;
            const uploadResult = yield cloudinary_1.v2.uploader
                .upload(dataURI, {
                public_id: eventId,
            }).then((res) => {
                console.log('res from cloudinary', res);
                return res.secure_url;
            })
                .catch((error) => {
                return false;
            });
            return uploadResult + '';
        });
    }
    getImage(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const optimizeUrl = cloudinary_1.v2.url(eventId, {
                fetch_format: 'auto',
                quality: 'auto'
            });
            return optimizeUrl;
        });
    }
}
exports.default = Cloudinary;
