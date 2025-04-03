import { Injectable } from '@nestjs/common';
import { TemplateHandler } from '../TemplateHandler';
import { LikeCheck } from '../../../dto/request/LikeCheck';
import { TemplateOperation } from '../types/Operation';
import { LikeHelper } from 'src/domain/template/infrastructure/adapter/input/helper/Like.Helper';

@Injectable()
export class LikeChecker implements TemplateHandler<[LikeCheck], Promise<void>> {
  operation: TemplateOperation = 'CHECK_LIKE';
  constructor(private readonly likeHelper: LikeHelper) {}
  async handle(request: [LikeCheck]) {
    const [likeCheck] = request;
    await this.likeHelper.executeUpdateLikeCheck(likeCheck.getLikeId());
  }
}
