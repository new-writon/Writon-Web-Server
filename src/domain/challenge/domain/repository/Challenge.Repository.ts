import { Repository } from "typeorm";
import { Challenge } from "../entity/Challenge";
import { Period } from "../../dto/response/Period";


export interface ChallengeRepository extends Repository<Challenge>{

    findChallengeByIdAndOngoing(challengeId: number): Promise<Challenge[]>;

    findOverlapPeriod(challengeId: number): Promise<number>;

    findChallengeById(challengeId: number): Promise<Challenge>;

}