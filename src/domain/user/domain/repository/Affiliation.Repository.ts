import { Repository } from 'typeorm';
import { Affiliation } from '../entity/Affiliation';
import { ChallengesPerOrganization } from '../../dto/values/ChallengesPerOrganization';
import { UserProfile } from '../../dto/response/UserProfile';
import { Participant } from '../../dto/response/Participant';


export interface AffiliationRepository extends Repository<Affiliation> {

    findAffiliationByUserIdWithOrganization(userId: number, organization: string): Promise<Affiliation>;
    findAffiliationByNicknameAndOrganization(nickname:string, organization:string):Promise<Affiliation>;
    insertAffiliation(userId:number, organizationId:number, nickname: string, position: string,
        positionIntroduce: string, hireDate: string, company: string,companyPublic: boolean):Promise<void>;
    findChallengesPerOrganizationByUserId(userId:number):Promise<ChallengesPerOrganization[]>;
   // findAffiliationByUserIdWithOrganization(userId:number, organization:string):Promise<Affiliation>;
    findUserProfileByUserIdAndOrganization(userId:number, organization:string):Promise<UserProfile>;
    updateUserProfileByUserIdAndOrganization(userId:number,organization:string,nickname:string, company:string,
        hireDate:Date,position:string,positionIntroduce:string,companyPublic:boolean):Promise<void>;
    
    findAffilaitonWithChallengeIdArray(userChallengeId:number[]):Promise<Affiliation[]>;
    findAffilaitonWithChallengeIdAndUserChallengeId(challengeId:number, userChallengeId:number[]):Promise<Affiliation[]>;
    findAffiliationById(affiliationId: number[]):Promise<Affiliation[]>;
    findAffiliationAndUserById(affiliationId: number[]):Promise<Affiliation[]>;
    findAffiliationAndUserAndUserChallengeWithUserIdAndChallengeId(userId:number, challengeId:number):Promise<Participant>;
    findAffiliationAndUserAndUserChallengeWithExceptUserIdAndChallengeId(userId:number, challengeId:number):Promise<Participant[]>;
    findAffiliationAndUserByUserIdAndOrganization(userId: number, organization: string):Promise<Affiliation>;

}