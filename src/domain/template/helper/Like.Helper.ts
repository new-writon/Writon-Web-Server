import { Inject, Injectable } from '@nestjs/common';
import { LikeRepository } from '../domain/repository/Like.Repository';
import { Likes } from '../domain/entity/Likes';
import { TemplateVerifyService } from '../../../global/exception/template/TemplateVerify.Service';

@Injectable()
export class LikeHelper {
  constructor(
    @Inject('likeImpl')
    private readonly likeRepository: LikeRepository,
    private readonly templateVerifyService: TemplateVerifyService,
  ) {}

  public async executeUpdateLikeCheck(likeId: number): Promise<void> {
    return this.likeRepository.updateLikeCheck(likeId);
  }

  public async giveLikeWithUserIdAndOrganizationAndChallengeId(
    userId: number,
    organization: string,
    challengeId: number,
  ): Promise<Likes[]> {
    return this.likeRepository.findLikeWithUserIdAndOrganizationAndChallengeId(
      userId,
      organization,
      challengeId,
    );
  }

  public async giveLikeByAffiliationIdAndUserTemplateId(
    affiliationId: number,
    userTemplateId: number,
  ): Promise<Likes> {
    return this.likeRepository.findLikeByAffiliationIdAndUserTemplateId(
      affiliationId,
      userTemplateId,
    );
  }

  public async executeInsertLike(
    affiliationId: number,
    userTemplateId: number,
  ): Promise<Likes> {
    return this.likeRepository.insertLike(affiliationId, userTemplateId);
  }

  public async giveLikeCountByUserTemplateId(
    userTemplateId: number,
  ): Promise<number> {
    return this.likeRepository.findLikeCountByUserTemplateId(userTemplateId);
  }

  public async giveLikesByUserTemplateId(
    userTemplateId: number,
  ): Promise<Likes[]> {
    return this.likeRepository.findLikesByUserTemplateId(userTemplateId);
  }

  public async executeDeleteLike(
    affiliationId: number,
    userTemplateId: number,
  ): Promise<void> {
    return this.likeRepository.deleteLike(affiliationId, userTemplateId);
  }
}
