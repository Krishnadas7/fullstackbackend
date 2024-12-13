import jwt from 'jsonwebtoken'
import Ijwt from '../../usecase/interface/services/Ijwt'
class JwtPassword implements Ijwt{


     async createJWT(
        userid: string, 
        email: string, 
        role: string, 
        first_name: string
        ): Promise<{ accessToken: string, refreshToken: string }> {
            const accessTokenKey  = process.env.ACCESS_TOKEN_KEY
            const refreshTokenKey  = process.env.REFRESH_TOKEN_KEY
            if(accessTokenKey && refreshTokenKey){
            const accessToken: string = jwt.sign(
                { id: userid, email: email, role: role, name: first_name },
                accessTokenKey,
                { expiresIn: '1d' } // Adjust as needed
            );
             
            const refreshToken: string = jwt.sign(
                { id: userid },
                refreshTokenKey,
                { expiresIn: '30d' } // Adjust as needed
            );
            return { accessToken, refreshToken };
            }
            throw new Error('token is not created')
    }
}
export default JwtPassword