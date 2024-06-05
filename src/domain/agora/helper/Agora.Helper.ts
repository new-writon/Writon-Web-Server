import { Inject, Injectable } from "@nestjs/common";
import { AgoraRepository } from "../domain/repository/Agora.Repository.js";


@Injectable()
export class AgoraHelper{

    constructor(
        @Inject("agoraImpl")
        private readonly agoraRepository: AgoraRepository
    ){}
    
}