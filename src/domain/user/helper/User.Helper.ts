import { Inject } from "@nestjs/common";
import { UserRepository } from "../domain/repository/User.Repository";
import { UserAffiliationOrganization } from "../dto/values/UserAffilatiionOrganization.interface";
import { User } from "../domain/entity/User";
import { UserVerifyService } from "../domain/service/UserVerify.Service";


export class UserHelper {
    constructor(
        @Inject('userImpl')
        private readonly userRepository: UserRepository,
        private readonly userVerifyService: UserVerifyService
    ){}


    public async giveUserDataBySocialNumberOrIdentifier(idenfitier: string, verifyFlag:boolean){
        const data = await this.userRepository.selectUserDataBySocialNumberOrIdentifier(idenfitier);
        if(verifyFlag) this.userVerifyService.verifyUser(data);
        return data;
    }

    public async executeLocalSignUp(identifier: string, password: string, email: string){
        return this.userRepository.localSignUp(identifier, password, email);
    }

    public async giveUserByEmail(email: string, verifyFlag:boolean){
        const data = await this.userRepository.findUserByEmail(email);
        if(verifyFlag) this.userVerifyService.verifyUser(data);
        return data;
    }

    public async executeUpdatePassword(idenfitier: string, email:string, password:string){
        return  this.userRepository.updatePassword(idenfitier, email, password);
    }

    public async giveUserById(userId: number, verifyFlag:boolean){
        const data = await this.userRepository.selectUserById(userId);
        if(verifyFlag) this.userVerifyService.verifyUser(data);
        return data;
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


    public async executeUpdateAccount(accountNumber:string, bank:string, userId:number):Promise<void>{
        return this.userRepository.updateAccount(accountNumber, bank, userId);
    }




}