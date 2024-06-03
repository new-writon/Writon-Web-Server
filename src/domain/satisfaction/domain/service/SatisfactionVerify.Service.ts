import { Injectable } from "@nestjs/common";
import { Satisfaction } from "../entity/Satisfaction.js";
import { SatisfactionException } from "../../exception/SatisfactionException.js";
import { SatisfactionErrorCode } from "../../exception/SatisfactionErrorCode.js";
import { checkData } from "../../util/checker.js";


@Injectable()
export class SatisfactionVerifyService{


    public verifySatisfaction(satisfaction:Satisfaction[]){
        if(!checkData(satisfaction))
            throw new SatisfactionException(SatisfactionErrorCode.NOT_FOUND_SATISFACTION_QUESTION);
    }

}