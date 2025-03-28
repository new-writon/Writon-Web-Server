import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { CommentHelper } from '../../../helper/Comment.Helper';
import { UserApi } from '../../../infrastructure/User.Api';
import { MyComment } from '../../../dto/response/MyComment';
import { Affiliation } from 'src/domain/user/domain/entity/Affiliation';
import { checkData } from '../../../util/checker';
import { DataMapperService } from '../../../domain/service/DataMappper.Service';
import { Comment } from '../../../domain/entity/Comment';
import { TemplateOperation } from '../../types/Operation';

@Injectable()
export class MyCommentCollector
  implements TemplateHandler<[string, number, number], Promise<MyComment[]>>
{
  operation: TemplateOperation = 'SELECT_MY_COMMENT';
  constructor(
    private readonly commentHelper: CommentHelper,
    private readonly userApi: UserApi,
    private readonly dataMapperService: DataMapperService,
  ) {}

  async handle(request: [string, number, number]) {
    const [organization, challengeId, userId] = request;
    const commentWriteAffiliationData =
      await this.userApi.requestAffiliationByUserIdAndOrganization(userId, organization);
    const commentData = await this.commentHelper.giveCommentByAffiliationIdWithChallengeId(
      commentWriteAffiliationData.getAffiliationId(),
      challengeId,
    );
    return commentData.length === 0 ? ([] as MyComment[]) : this.processCommentData(commentData);
  }

  private async processCommentData(commentData: Comment[]): Promise<MyComment[]> {
    const userChallengeIdArray = this.dataMapperService.extractUserChallengeId(commentData);
    const templateWriteAffiliationData =
      await this.userApi.requestAffilaitonWithChallengeIdArray(userChallengeIdArray);
    const myComment = this.makeMyCommentMapper(templateWriteAffiliationData, commentData);
    return MyComment.of(myComment);
  }

  private makeMyCommentMapper(affiliationData: Affiliation[], commentData: Comment[]) {
    return commentData.map((comment) => {
      const affiliation = affiliationData.find(
        (affiliation) =>
          affiliation.userChallenges[0].getId() === comment.userTemplate.getUserChallengeId(),
      );
      if (checkData(affiliation)) {
        return new MyComment(
          comment.getId(),
          comment.getCreatedAt(),
          comment.getContent(),
          comment.userTemplate.getTemplateDate(),
          affiliation.getNickname(),
          comment.getUserTemplateId(),
        );
      }
    });
  }
}
