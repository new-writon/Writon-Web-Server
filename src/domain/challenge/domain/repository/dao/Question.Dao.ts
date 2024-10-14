import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Question } from '../../entity/Question';
import { QuestionRepository } from '../Question.Repository';
import { Keyword } from '../../entity/Keyword';
import { SpecialQuestion } from '../../../dto/response/SpecialQuestion';
import { BasicQuestion } from '../../../dto/response/BasicQuestion';

@Injectable()
export class QuestionDao
  extends Repository<Question>
  implements QuestionRepository
{
  constructor(private dataSource: DataSource) {
    super(Question, dataSource.createEntityManager());
  }

  async findBasicQuestionByChallengeId(
    challengeId: number,
  ): Promise<BasicQuestion[]> {
    return this.dataSource
      .createQueryBuilder()
      .select(['q.question_id AS questionId', 'q.question AS question'])
      .from(Question, 'q')
      .where('q.challenge_id = :challengeId', { challengeId })
      .andWhere('q.category LIKE :category', { category: '%베이직%' })
      .orderBy('q.question_id')
      .getRawMany();
  }

  async findSpecialQuestionByChallengeId(
    challengeId: number,
  ): Promise<SpecialQuestion[]> {
    return this.dataSource
      .createQueryBuilder()
      .select([
        'q.question_id AS questionId',
        'q.question AS question',
        'k.keyword AS keyword',
      ])
      .from(Question, 'q')
      .innerJoin(Keyword, 'k', 'k.keyword_id = q.keyword_id')
      .where('q.challenge_id = :challengeId', { challengeId })
      .andWhere('q.category LIKE :category', { category: '%스페셜%' })
      .orderBy('k.keyword')
      .addOrderBy('q.question_id')
      .getRawMany();
  }

  async findQuestionById(questionId: number[]): Promise<Question[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('q')
      .from(Question, 'q')
      .where('q.question_id IN (:...questionId)', { questionId })
      .getMany();
  }

  async findQuestionsByChallengeId(challengeId: number): Promise<Question[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('q')
      .from(Question, 'q')
      .where('q.challenge_id = :challengeId', { challengeId })
      .getMany();
  }
}
