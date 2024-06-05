import { Repository } from "typeorm";
import { AgoraRepository } from "../Agora.Repository.js";
import { Agora } from "../../entity/Agora.js";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AgoraDao extends Repository<Agora> implements AgoraRepository{
    
}
