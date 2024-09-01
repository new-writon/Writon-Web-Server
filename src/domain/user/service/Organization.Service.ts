import { Injectable } from "@nestjs/common";
import { OrganizationHelper } from "../helper/Organization.Helper";
import { Position } from "../domain/entity/Position";
import { PositionNames } from "../dto/response/PositionNames";



@Injectable()
export class OrganizationService{

    constructor(
        private readonly organizationHelper: OrganizationHelper,
    ){}

    public async bringPositions(organization:string): Promise<PositionNames>{
        const positionDatas = await this.organizationHelper.givePositionsByOrganizationId(organization);
        const mappedPositionDatas = this.mappingPositionDatas(positionDatas);
        return PositionNames.of(mappedPositionDatas);
       
    }

    private mappingPositionDatas(positionDatas:Position[]){
        return positionDatas.map((data)=>data.getName())
    }


}