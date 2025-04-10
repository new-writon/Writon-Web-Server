import { Question } from 'src/domain/challenge/domain/entity/Question';
import { BasicQuestion } from 'src/domain/challenge/dto/response/BasicQuestion';
import { SpecialQuestion } from 'src/domain/challenge/dto/response/SpecialQuestion';
import { Repository } from 'typeorm';

export interface QuestionRepository extends Repository<Question> {
  findBasicQuestionByChallengeId(challengeId: number): Promise<BasicQuestion[]>;
  findSpecialQuestionByChallengeId(challengeId: number): Promise<SpecialQuestion[]>;
  findQuestionById(questionId: number[]): Promise<Question[]>;
  findQuestionsByChallengeId(challengeId: number): Promise<Question[]>;
}
