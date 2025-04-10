import { Repository } from 'typeorm';
import { SatisfactionObjectiveResult } from '../entity/SatisfactionObjectiveResult';
import { ObjectiveAnswerType } from '../../dto/values/ObjectiveAnswerType';

export interface SatisfactionObjectiveResultRepository
  extends Repository<SatisfactionObjectiveResult> {
  insertSatisfactionObjectiveResult(objectiveAnswer: ObjectiveAnswerType[]): Promise<void>;
}
