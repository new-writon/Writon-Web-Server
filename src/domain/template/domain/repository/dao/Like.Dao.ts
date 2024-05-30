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
}