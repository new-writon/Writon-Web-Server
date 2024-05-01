import { Injectable } from "@nestjs/common";
import jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken"


@Injectable()
export class JwtManager {

    public makeAccessToken = (userId: number, userRole: string): string => {
        const payload = {
            userId: userId,
            role: userRole,
        };
        return 'Bearer ' + jwt.sign(payload, process.env.SECRET, {
            algorithm: 'HS256',
            expiresIn: '15m',
        });
    }

    public makeRefreshToken = () => {
        return 'Bearer ' + jwt.sign({}, process.env.SECRET, {
            algorithm: 'HS256',
            expiresIn: '30d',
        });
    }

    public decode = (token: string) => {
        try {
            const decoded = jwt.decode(token) as JwtPayload;

            return {
                message: "Ok",
                id: decoded.id,
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
                id: decoded!.id,
                role: decoded!.role,
            };
        } catch (err) {
            return {
                state: false,
            };
        }
    };

    // public refreshVerify = async (token: string, userId: number) => {

    //     try {

    //         const data = await redisDao.getRedis(String(userId));

    //         if (token === data.split('Bearer ')[1]) {

    //             jwt.verify(token, process.env.SECRET);

    //             return { state: true, token: data };
    //         }
    //         return { state: false };

    //     } catch (err) {
    //         return { state: false };
    //     }
    // };



}