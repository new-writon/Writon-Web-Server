import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Challenge } from '../../domain/challenge/domain/entity/Challenge.js';
import { ChallengeDay } from '../../domain/challenge/domain/entity/ChallengeDay.js';
import { Affiliation } from '../../domain/user/domain/entity/Affiliation.js';
import { Likes } from '../../domain/template/domain/entity/Likes.js';
import { User } from '../../domain/user/domain/entity/User.js';
import { Organization } from '../../domain/user/domain/entity/Organization.js';
import { ChallengeDepositDeduction } from '../../domain/challenge/domain/entity/ChallengeDepositDeduction.js';
import { UserChallenge } from '../../domain/user/domain/entity/UserChallenge.js';
import { ErrorLog } from '../../domain/errorr/domain/entity/ErrorLog.js';
import { Agora } from '../../domain/agora/domain/entity/Agora.js';
import { AgoraComment } from '../../domain/agora/domain/entity/AgoraComment.js';
import { Satisfaction } from '../../domain/satisfaction/domain/entity/Satisfaction.js';
import { SatisfactionObjectiveResult } from '../../domain/satisfaction/domain/entity/SatisfactionObjectiveResult.js';
import { SatisfactionSubjectiveResult } from '../../domain/satisfaction/domain/entity/SatisfactionSubjectiveResult.js';
import { Question } from '../../domain/challenge/domain/entity/Question.js';
import { QuestionContent } from '../../domain/template/domain/entity/QuestionContent.js';
import { QuestionTag } from '../../domain/challenge/domain/entity/QuestionTag.js';
import { UserTemplete } from '../../domain/template/domain/entity/UserTemplete.js';
import { Comment } from '../../domain/template/domain/entity/Comment.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  entities: [
  //  `${join(__dirname, '../../')}/domain/**/*.{js,ts}`,
    User, Organization, Affiliation,  UserChallenge,
    Challenge, ChallengeDay, ChallengeDepositDeduction,
    ErrorLog, Agora, AgoraComment,  Likes,
    Satisfaction, SatisfactionObjectiveResult, SatisfactionSubjectiveResult, 
    QuestionTag, UserTemplete, Comment, UserChallenge, Question, QuestionContent,

  ],
  synchronize: false,
};


export const dataSource = registerAs('data-source', () => {
  return {
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    synchronize: false,
    autoLoadEntities: true,
    entities: [
    //  `${join(__dirname, '../../')}/domain/**/*.{js,ts}`
    User, Organization, Affiliation,  UserChallenge,
    Challenge, ChallengeDay, ChallengeDepositDeduction,
    ErrorLog, Agora, AgoraComment,  Likes,
    Satisfaction, SatisfactionObjectiveResult, SatisfactionSubjectiveResult, 
    QuestionTag, UserTemplete, Comment, UserChallenge, Question, QuestionContent,

    
    ]
  } as TypeOrmModuleOptions;
});

export default new DataSource(dataSourceOptions);
