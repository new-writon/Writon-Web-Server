import { Injectable } from "@nestjs/common";
import { Organization } from "src/domain/user/domain/entity/Organization";



@Injectable()
export class DataMapperService{

    public extractOrganizationIds(organizations:Organization[]){
        return organizations.map((data)=> data.getId());
    }




}