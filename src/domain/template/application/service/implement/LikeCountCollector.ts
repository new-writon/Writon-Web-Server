import { Injectable } from '@nestjs/common';
import { LikeCount } from '../../../dto/response/LikeCount';
import { TemplateOperation } from '../types/Operation';
import { LikeHelper } from 'src/domain/template/application/helper/Like.Helper';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';

@Injectable()
export class LikeCountCollector implements TemplateUseCase<[number], Promise<LikeCount>> {
  operation: TemplateOperation = 'SELECT_LIKE_COUNT';

  constructor(private readonly likeHelper: LikeHelper) {}
  async handle(request: [number]): Promise<LikeCount> {
    const [userTemplateId] = request;
    const likeCount = await this.likeHelper.giveLikeCountByUserTemplateId(userTemplateId);
    return LikeCount.of(likeCount);
  }
}
