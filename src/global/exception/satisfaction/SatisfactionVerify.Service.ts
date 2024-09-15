import { Injectable } from "@nestjs/common";
import { Satisfaction } from "../entity/Satisfaction";
import { SatisfactionException } from "../../exception/SatisfactionException";
import { SatisfactionErrorCode } from "../../exception/SatisfactionErrorCode";
import { checkData } from "../../util/checker";


@Injectable()
export class SatisfactionVerifyService{


    public verifySatisfaction(satisfaction:Satisfaction[]){
        if(!checkData(satisfaction))
            throw new SatisfactionException(SatisfactionErrorCode.NOT_FOUND_SATISFACTION_QUESTION);
    }

}