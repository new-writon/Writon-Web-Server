import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { SmallTalkComment } from '../../../smalltalk/domain/entity/SmallTalkComment';
import { Comment } from '../../../template/domain/entity/Comment';
import { Likes } from '../../../template/domain/entity/Likes';
import { UserChallenge } from './UserChallenge';
import { BaseEntity } from '../../../../global/entity/base.entitiy';
import { InternalServerErrorException } from '@nestjs/common';

@Index('affiliations_users_fkey', ['userId'], {})
@Index('affiliations_organizations_fkey', ['organizationId'], {})
@Entity('affiliations', { schema: 'nest' })
export class Affiliation extends BaseEntity {
  constructor(
    userId: number,
    organizationId: number,
    nickname: string,
    position: string,
    positionIntroduce: string,
    hireDate: string,
    company: string,
    companyPublic: boolean,
  ) {
    super(), this.setUserId(userId);
    this.setOrganizationId(organizationId);
    this.setNickname(nickname);
    this.setPosition(position);
    this.setPositionIntroduce(positionIntroduce);
    this.setHireDate(hireDate);
    this.setCompany(company);
    this.setCompanyPublic(companyPublic);
    // this.setNickname(affiliationStartDto.getNickname())
    // this.setPosition(affiliationStartDto.getPosition())
    // this.setPositionIntroduce(affiliationStartDto.getPositionIntroduce())
    // this.setHireDate(String(affiliationStartDto.getHireDate()))
    // this.setCompany(affiliationStartDto.getCompany())
    // this.setCompanyPublic(affiliationStartDto.getCompanyPublic())
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'affiliation_id' })
  affiliationId: number;

  @Column('int', { name: 'organization_id' })
  organizationId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('date', { name: 'hire_date', nullable: true })
  hireDate: string | null;

  @Column('varchar', { name: 'position', nullable: true, length: 20 })
  position: string | null;

  @Column('varchar', {
    name: 'position_introduce',
    nullable: true,
    length: 300,
  })
  positionIntroduce: string | null;

  @Column('varchar', { name: 'nickname', length: 191 })
  nickname: string;

  @Column('varchar', { name: 'company', nullable: true, length: 50 })
  company: string | null;

  @Column('tinyint', { name: 'company_public', nullable: true, width: 1 })
  companyPublic: boolean | null;

  @ManyToOne(() => Organization, (organization) => organization.affiliations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'organization_id', referencedColumnName: 'organizationId' },
  ])
  organization: Relation<Organization>;

  @ManyToOne(() => User, (user) => user.affiliations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @OneToMany(
    () => SmallTalkComment,
    (smallTalkComment) => smallTalkComment.affiliation,
  )
  smallTalkComments: Relation<SmallTalkComment>[];

  // @OneToMany(() => Challenge, (challenge) => challenge.affiliation)
  // challenges: Relation<Challenge>[];

  @OneToMany(() => Comment, (comment) => comment.affiliation)
  comments: Relation<Comment>[];

  @OneToMany(() => Likes, (likes) => likes.affiliation)
  likes: Relation<Likes>[];

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.affiliation)
  userChallenges: Relation<UserChallenge>[];

  private setUserId(userId: number) {
    if (userId === null)
      throw new InternalServerErrorException(
        `${__dirname} : userId 값이 존재하지 않습니다.`,
      );
    this.userId = userId;
  }

  private setOrganizationId(organizationId: number) {
    if (organizationId === null)
      throw new InternalServerErrorException(
        `${__dirname} : organizationId 값이 존재하지 않습니다.`,
      );
    this.organizationId = organizationId;
  }

  private setNickname(nickname: string) {
    if (nickname === null)
      throw new InternalServerErrorException(
        `${__dirname} : nickname 값이 존재하지 않습니다.`,
      );
    this.nickname = nickname;
  }

  private setPosition(position: string) {
    if (position === null)
      throw new InternalServerErrorException(
        `${__dirname} : position 값이 존재하지 않습니다.`,
      );
    this.position = position;
  }

  private setPositionIntroduce(positionIntroduce: string) {
    if (positionIntroduce === null)
      throw new InternalServerErrorException(
        `${__dirname} : positionIntroduce 값이 존재하지 않습니다.`,
      );
    this.positionIntroduce = positionIntroduce;
  }

  private setHireDate(hireDate: string) {
    if (hireDate === null)
      throw new InternalServerErrorException(
        `${__dirname} : hireDate 값이 존재하지 않습니다.`,
      );
    this.hireDate = hireDate;
  }

  private setCompany(company: string) {
    if (company === null)
      throw new InternalServerErrorException(
        `${__dirname} : company 값이 존재하지 않습니다.`,
      );
    this.company = company;
  }

  private setCompanyPublic(companyPublic: boolean) {
    if (companyPublic === null)
      throw new InternalServerErrorException(
        `${__dirname} : companyPublic 값이 존재하지 않습니다.`,
      );
    this.companyPublic = companyPublic;
  }

  public static createAffiliation(
    userId: number,
    organizationId: number,
    nickname: string,
    position: string,
    positionIntroduce: string,
    hireDate: string,
    company: string,
    companyPublic: boolean,
  ) {
    return new Affiliation(
      userId,
      organizationId,
      nickname,
      position,
      positionIntroduce,
      hireDate,
      company,
      companyPublic,
    );
  }

  public getAffiliationId(): number {
    return this.affiliationId;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getCompany(): string {
    return this.company;
  }

  public getCompanyPublic(): boolean {
    return this.companyPublic;
  }

  public getPosition(): string {
    return this.position;
  }

  public getPositionIntroduce(): string {
    return this.positionIntroduce;
  }

  public getHireDate(): string {
    return this.hireDate;
  }

  public getId(): number {
    return this.affiliationId;
  }

  public getUser() {
    return this.user;
  }
}
