import { Injectable } from "@nestjs/common";
import jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken"
import { TokenManager } from "../../../global/util/TokenManager.js";


@Injectable()
export class JwtManager {

    constructor(
        private readonly tokenManager: TokenManager
    ){}

    public makeAccessToken = (userId: number, userRole: string): string => {
        const payload = {
            userId: userId,
            role: userRole,
        };
        return 'Bearer ' + jwt.sign(payload, process.env.SECRET, {
            algorithm: 'HS256',
            expiresIn: '2m',
        });
    }

    public makeRefreshToken = () => {
        return 'Bearer ' + jwt.sign({}, process.env.SECRET, {
            algorithm: 'HS256',
            expiresIn: '4m',
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
            const decoded = jwt.verify(token, process.env.SECRET) as JwtPayload
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

        try {
            console.log(userId)
            const responseToken = await this.tokenManager.getToken(String(userId))
            console.log(requestToken)
            console.log(responseToken)
            if (this.verifyToken(requestToken, responseToken)) {
                console.log(1)
                this.verify(requestToken);
                console.log(2)
                return { state: true, token: responseToken };
            }
            return { state: false };
        } catch (err) {
            return { state: false };
        }
    };

    private verifyToken(externalToken: string, internalToken: string): boolean{
        if(externalToken.split('Bearer ')[1] === internalToken.split('Bearer ')[1])
            return true;
        return false;
    }





}