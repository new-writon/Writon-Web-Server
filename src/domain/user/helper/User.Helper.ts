import { Inject } from "@nestjs/common";
import { UserRepository } from "../domain/repository/User.Repository.js";
import { UserAffiliationOrganization } from "../../interface/UserAffilatiionOrganization.interface.js";
import { User } from "../domain/entity/User.js";


export class UserHelper {
    constructor(
        @Inject('userImpl')
        private readonly userRepository: UserRepository,
    ){}


    public async giveUserDataBySocialNumberOrIdentifier(idenfitier: string){
        return this.userRepository.selectUserDataBySocialNumberOrIdentifier(idenfitier);
    }

    public async executeLocalSignUp(identifier: string, password: string, email: string){
        return this.userRepository.localSignUp(identifier, password, email);
    }

    public async giveUserByEmail(email: string){
        return this.userRepository.findUserByEmail(email);
    }

    public async executeUpdatePassword(idenfitier: string, email:string, password:string){
        return  this.userRepository.updatePassword(idenfitier, email, password);
    }

    public async giveUserById(userId: number){
        return this.userRepository.selectUserById(userId);
    }

    public async executeUpdatePasswordByUserId(userId: number, password: string){
        return this.userRepository.updatePasswordByUserId(userId, password);
    }

    public async executeKakaoSignUp(email: string, kakaoId: string, profileImage: string){
        return this.userRepository.kakaoSignUp(email, kakaoId, profileImage);
    }

    public async giveUserAffiliation(userId: number, organization: string): Promise<UserAffiliationOrganization[]>{
        return this.userRepository.findUserAffiliation(userId, organization);
    }

    public async giveUserDataByEmail(email: string): Promise<User>{
        return this.userRepository.selectUserDataByEmail(email);
    }

    public async executeUpdateAccount(accountNumber:string, bank:string, userId:number):Promise<void>{
        return this.userRepository.updateAccount(accountNumber, bank, userId);
    }




}