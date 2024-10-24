import { Repository } from 'typeorm';
import { UserTemplate } from '../entity/UserTemplate';

export interface UserTemplateRepository extends Repository<UserTemplate> {
  findUserTemplateByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]>;
  findChallengeSuccessChallengeCount(userChallengeId: number): Promise<number>;
  insertUserTemplate(
    userChallnegeId: number,
    date: Date,
    complete: boolean,
  ): Promise<UserTemplate>;
  findUserTemplateAndCommentAndLikeByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]>;
  findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(
    userChallengeId: number[],
    date: Date,
  ): Promise<UserTemplate[]>;
  findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]>;
  findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(
    userTemplateId: number,
    visibility: boolean,
  ): Promise<UserTemplate>;
  findUserTemplateSuccessCountByUserChallengeIds(userChallengeIds: number[]);
  findUserTemplateByUserChallengeIdAndDate(
    userChallengeId: number,
    date: string,
  ): Promise<UserTemplate>;
  findUserTemplateById(userTemplateId: number): Promise<UserTemplate>;
}
