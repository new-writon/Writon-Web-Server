import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Likes } from "../../entity/Likes.js";
import { LikeRepository } from "../Like.Repository.js";


@Injectable()
export class LikeDao extends Repository<Likes> implements LikeRepository{

    constructor(private dataSource: DataSource) { super(Likes, dataSource.createEntityManager()); }

    async updateLikeCheck(likeId:number):Promise<void>{
        await this.dataSource.createQueryBuilder()
            .update(Likes)
            .set({
                check: true
            })
            .where('like_id = :likeId',{likeId})
            .execute();
    }


    async findLikeWithUserIdAndOrganizationAndChallengeId(userId:number, organization:string, challengeId:number): Promise<Likes[]>{
        return this.dataSource.createQueryBuilder(Likes, 'l')
        .innerJoinAndSelect('l.userTemplete', 'ut','ut.user_templete_id = l.user_templete_id')
        .innerJoinAndSelect('l.affiliation', 'a', 'l.affiliation_id = a.affiliation_id')
        .getMany();

    }
}