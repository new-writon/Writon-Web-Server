import { Injectable } from '@nestjs/common';
import { LikeCheck } from '../../../dto/request/LikeCheck';
import { TemplateOperation } from '../types/Operation';
import { LikeHelper } from 'src/domain/template/application/helper/Like.Helper';
import { TemplateUseCase } from '../../port/input/TemplateUseCase';

@Injectable()
export class LikeChecker implements TemplateUseCase<[LikeCheck], Promise<void>> {
  operation: TemplateOperation = 'CHECK_LIKE';
  constructor(private readonly likeHelper: LikeHelper) {}
  async handle(request: [LikeCheck]) {
    const [likeCheck] = request;
    await this.likeHelper.executeUpdateLikeCheck(likeCheck.getLikeId());
  }
}
