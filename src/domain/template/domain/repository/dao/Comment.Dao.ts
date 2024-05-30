import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CommentRepository } from "../Comment.Repository.js";
import { Comment } from "../../entity/Comment.js";
import { UserChallenge } from "../../../../user/domain/entity/UserChallenge.js";


@Injectable()
export class CommentDao extends Repository<Comment> implements CommentRepository{

    constructor(private dataSource: DataSource) { super(Comment, dataSource.createEntityManager()); }

    async findCommentByAffiliationIdWithChallengeId(affiliationId: number, challengeId:number): Promise<Comment[]> {
        return this.dataSource.createQueryBuilder(Comment, 'c')
            .innerJoinAndSelect('c.userTemplete', 'ut')
            .innerJoin(UserChallenge,'uc', 'uc.user_challenge_id = ut.user_challenge_id')
            .where('c.affiliation_id = :affiliationId', { affiliationId })
            .andWhere('uc.challenge_id = :challengeId',{challengeId})
            .orderBy('c.createdAt', "DESC")
            .getMany();
    }
    
    

}