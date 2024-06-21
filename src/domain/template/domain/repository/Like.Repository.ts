import { Repository } from "typeorm";
import { Likes } from "../entity/Likes.js";



export interface LikeRepository extends Repository<Likes>{

    updateLikeCheck(likeId:number):Promise<void>;
    findLikeWithUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId:number): Promise<Likes[]>;
    insertLike(affiliationId:number, userTemplateId:number):Promise<Likes>;
    findLikeCountByUserTemplateId(userTemplateId:number):Promise<number>;

}