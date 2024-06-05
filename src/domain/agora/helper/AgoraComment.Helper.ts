import { Inject, Injectable } from "@nestjs/common";
import { AgoraCommentRepository } from "../domain/repository/AgoraComment.Repository.js";

@Injectable()
export class AgoraCommentHelper{

    constructor(
        @Inject("agoraCommentImpl")
        private readonly agoraCommentRepository: AgoraCommentRepository
    ){}

}