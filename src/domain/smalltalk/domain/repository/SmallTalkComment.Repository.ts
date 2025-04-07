import { Repository } from 'typeorm';
import { SmallTalkComment } from '../entity/SmallTalkComment';
import { ParticularSmallTalkCommentData } from '../../dto/values/ParticularSmallTalkCommentData';

export interface SmallTalkCommentRepository extends Repository<SmallTalkComment> {
  insertSmallTalkComment(
    smallTalkId: number,
    affiliationId: number,
    smallTalkComment: string,
  ): Promise<void>;
  findSmallTalkCommentBySmallTalkId(smallTalkId: number): Promise<ParticularSmallTalkCommentData[]>;
}
