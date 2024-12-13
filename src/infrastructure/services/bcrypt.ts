import bcrypt from 'bcryptjs';
import IHashPassword from '../../usecase/interface/services/IhashPassword';

class Encrypt implements IHashPassword{
async createHash(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('sksd',hashedPassword);
    
    return hashedPassword;
}
async compare(password: string, hashpassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hashpassword);
    return match;
  }

}

export default Encrypt