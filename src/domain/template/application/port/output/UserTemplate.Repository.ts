import { UserTemplate } from 'src/domain/template/domain/entity/UserTemplate';
import { Repository } from 'typeorm';

export interface UserTemplateRepository extends Repository<UserTemplate> {
  findUserTemplateByUserChallengeId(userChallengeId: number): Promise<UserTemplate[]>;
  findChallengeSuccessChallengeCount(userChallengeId: number): Promise<number>;
  insertUserTemplate(userChallnegeId: number, date: Date, complete: boolean): Promise<UserTemplate>;
  findUserTemplateAndCommentAndLikeByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]>;
  findUserTemplateAndCommentAndLikeAndDefaultQeustionContentByUserChallengeIdAndDate(
    userChallengeId: number[],
    date: Date,
  ): Promise<UserTemplate[]>;
  findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeIdAndDate(
    userChallengeId: number[],
    date: Date,
  ): Promise<UserTemplate[]>;
  findUserTemplateAndCommentAndLikeAndQeustionContentByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]>;
  findUserTemplateAndCommentAndLikeAndDefaultQeustionContentByUserChallengeId(
    userChallengeId: number,
  ): Promise<UserTemplate[]>;
  findUserTemplateAndCommentAndLikeAndQeustionContentByUserTemplateIdWithVisibility(
    userTemplateId: number,
    visibility: boolean,
  ): Promise<UserTemplate>;
  findUserTemplateAndCommentAndLikeAndDefaultQeustionContentByUserTemplateIdWithVisibility(
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
