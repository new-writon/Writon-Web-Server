import { DataSource, Repository } from 'typeorm';
import { SmallTalkComment } from '../../entity/SmallTalkComment';
import { SmallTalkCommentRepository } from '../SmallTalkComment.Repository';
import { Injectable } from '@nestjs/common';
import { ParticularSmallTalkCommentData } from '../../../dto/values/ParticularSmallTalkCommentData';

@Injectable()
export class SmallTalkCommentDao
  extends Repository<SmallTalkComment>
  implements SmallTalkCommentRepository
{
  constructor(private dataSource: DataSource) {
    super(SmallTalkComment, dataSource.createEntityManager());
  }

  async insertSmallTalkComment(
    smallTalkId: number,
    affiliationId: number,
    smallTalkComment: string,
  ): Promise<void> {
    const newSmallTalkComment = SmallTalkComment.createSmallTalkComment(
      smallTalkId,
      affiliationId,
      smallTalkComment,
    );
    await this.save(newSmallTalkComment);
  }

  async findSmallTalkCommentBySmallTalkId(
    smallTalkId: number,
  ): Promise<ParticularSmallTalkCommentData[]> {
    const particularCommentData: ParticularSmallTalkCommentData[] = await this.dataSource
      .createQueryBuilder()
      .select([
        'stc.small_talk_comment_id AS smallTalkCommentId',
        'stc.content AS content',
        "TIME_FORMAT(stc.created_at, '%H:%i') AS createdTime",
        'stc.affiliation_id AS affiliationId',
      ])
      .from(SmallTalkComment, 'stc')
      .where('stc.small_talk_id = :smallTalkId', { smallTalkId })
      .orderBy('stc.created_at', 'ASC')
      .getRawMany();
    return particularCommentData.map(
      (data) =>
        new ParticularSmallTalkCommentData(
          data.smallTalkCommentId,
          data.content,
          data.createdTime,
          data.affiliationId,
        ),
    );
  }
}
