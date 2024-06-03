import { Repository } from "typeorm";
import { Satisfaction } from "../entity/Satisfaction.js";


export interface SatisfactionRepository extends Repository<Satisfaction>{

    findSatisfactionByChallengeId(challengeId:number):Promise<Satisfaction[]>;

}