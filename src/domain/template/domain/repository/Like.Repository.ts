import { Repository } from "typeorm";
import { Likes } from "../entity/Likes";



export interface LikeRepository extends Repository<Likes>{

    updateLikeCheck(likeId:number):Promise<void>;
    findLikeWithUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId:number): Promise<Likes[]>;
    insertLike(affiliationId:number, userTemplateId:number):Promise<Likes>;
    deleteLike(affiliationId:number, userTemplateId:number):Promise<void>;
    findLikeCountByUserTemplateId(userTemplateId:number):Promise<number>;

}