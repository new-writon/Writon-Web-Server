import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken"
import { TokenManager } from "../../../global/util/TokenManager";
import { ConfigService } from '@nestjs/config';



@Injectable()
export class JwtManager {

    constructor(
        private readonly tokenManager: TokenManager,
        private readonly configService: ConfigService,
    ){}

    public makeAccessToken = (userId: number, userRole: string): string => {
        const payload = {
            userId: userId,
            role: userRole,
        };
        return 'Bearer ' + jwt.sign(payload, this.configService.get<string>('jwt.secret'), {
            algorithm: this.configService.get<string>('jwt.algorithm') as jwt.Algorithm,
            expiresIn: this.configService.get<string>('jwt.access_token'),
        });
    }

    public makeRefreshToken = () => {
        return 'Bearer ' + jwt.sign({}, this.configService.get<string>('jwt.secret'), {
            algorithm: this.configService.get<string>('jwt.algorithm') as jwt.Algorithm,
            expiresIn: this.configService.get<string>('jwt.refresh_token'),
        });
    }

    public decode = (token: string) => {
        try {
            const decoded = jwt.decode(token) as JwtPayload;
            return {
                message: "Ok",
                userId: decoded.userId,
                role: decoded.role,
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    public verify = (token: string) => {
        try {
            const decoded = jwt.verify(token, this.configService.get<string>('jwt.secret')) as JwtPayload
            return {
                state: true,
                userId: decoded!.userId,
                role: decoded!.role,
            };
        } catch (err) {
            return {
                state: false,
            };
        }
    };

    public refreshVerify = async (requestToken: string, userId: number) => {
        try{  
            const responseToken = await this.tokenManager.getToken(String(userId));
            if (this.verifyToken(requestToken, (responseToken as string).split('Bearer ')[1])) {
                jwt.verify(requestToken, this.configService.get<string>('jwt.secret')) as JwtPayload
                return { state: true, token: responseToken };
            }
            return { state: false };
        }catch (err) {
            return { state: false };
        }
    };

    private verifyToken(externalToken: string, internalToken: string): boolean{
        if(externalToken.split('Bearer ')[1] === internalToken.split('Bearer ')[1])
            return true;
        return false;
    }

}