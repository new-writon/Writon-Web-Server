import { Repository } from "typeorm";
import { SatisfactionObjectiveResult } from "../entity/SatisfactionObjectiveResult.js";
import { ObjectiveAnswerType } from "../../dto/ObjectiveAnswerType.js";


export interface SatisfactionObjectiveResultRepository extends Repository<SatisfactionObjectiveResult>{


    insertSatisfactionObjectiveResult(objectiveAnswer: ObjectiveAnswerType[]):Promise<void>;

}