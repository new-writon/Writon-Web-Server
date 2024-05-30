import { Repository } from "typeorm";
import { Likes } from "../entity/Likes.js";



export interface LikeRepository extends Repository<Likes>{

    updateLikeCheck(likeId:number):Promise<void>;

}