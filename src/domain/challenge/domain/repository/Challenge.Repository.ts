import { Repository } from "typeorm";
import { Challenge } from "../entity/Challenge.js";
import { ChallengeInformation } from "../../dto/ChallengeInformation.js";
import { ChallengeAndOrganization } from "../../dto/ChallengeAndOrganization.js";


export interface ChallengeRepository extends Repository<Challenge>{

    findChallengeByIdAndOngoing(challengeId: number): Promise<Challenge[]>;

    findOverlapPeriod(challengeId: number): Promise<number>;

    findChallengeById(challengeId: number): Promise<Challenge>;

    findChallengeWithCondition(challengeId: number): Promise<ChallengeInformation[]>;

    findChallengeByChallengeName(challenge:string):Promise<Challenge>;

    findAllChallengeAccordingToOrganization():Promise<ChallengeAndOrganization[]>;

    findAllChallengingInformation():Promise<ChallengeAllInformation[]>;


}