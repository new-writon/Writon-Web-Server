import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Challenge } from '../../domain/challenge/domain/entity/Challenge.js';
import { ChallengeDay } from '../../domain/challenge/domain/entity/ChallengeDay.js';
import { Affiliation } from '../../domain/user/domain/entity/Affiliation.js';
import { Likes } from '../../domain/template/domain/entity/Likes.js';
import { User } from '../../domain/user/domain/entity/User.js';
import { Organization } from '../../domain/user/domain/entity/Organization.js';
import { ChallengeDepositDeduction } from '../../domain/challenge/domain/entity/ChallengeDepositDeduction.js';
import { UserChallenge } from '../../domain/user/domain/entity/UserChallenge.js';
import { ErrorLog } from '../../domain/error/domain/entity/ErrorLog.js';
import { SmallTalk } from '../../domain/smalltalk/domain/entity/SmallTalk.js';
import { SmallTalkComment } from '../../domain/smalltalk/domain/entity/SmallTalkComment.js';
import { Satisfaction } from '../../domain/satisfaction/domain/entity/Satisfaction.js';
import { SatisfactionObjectiveResult } from '../../domain/satisfaction/domain/entity/SatisfactionObjectiveResult.js';
import { SatisfactionSubjectiveResult } from '../../domain/satisfaction/domain/entity/SatisfactionSubjectiveResult.js';
import { Question } from '../../domain/challenge/domain/entity/Question.js';
import { QuestionContent } from '../../domain/template/domain/entity/QuestionContent.js';
import { Keyword } from '../../domain/challenge/domain/entity/Keyword.js';
import { UserTemplate } from '../../domain/template/domain/entity/UserTemplate.js';
import { Comment } from '../../domain/template/domain/entity/Comment.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "Cn37rqww@@!",
  database: "Writon-Data",
  entities: [
  //  `${join(__dirname, '../../')}/domain/**/*.{js,ts}`,
    User, Organization, Affiliation,  UserChallenge,
    Challenge, ChallengeDay, ChallengeDepositDeduction,
    ErrorLog, SmallTalk, SmallTalkComment,  Likes,
    Satisfaction, SatisfactionObjectiveResult, SatisfactionSubjectiveResult, 
    Keyword, UserTemplate, Comment, UserChallenge, Question, QuestionContent,

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
      User, Organization, Affiliation,  UserChallenge,
      Challenge, ChallengeDay, ChallengeDepositDeduction,
      ErrorLog, SmallTalk, SmallTalkComment,  Likes,
      Satisfaction, SatisfactionObjectiveResult, SatisfactionSubjectiveResult, 
      Keyword, UserTemplate, Comment, UserChallenge, Question, QuestionContent,
    ],
    logging: ['query', 'error']
  } as TypeOrmModuleOptions;
});

// export const AppDataSource = new DataSource(dataSourceOptions);

// export async function initializeDataSource() {
//     await AppDataSource.initialize();  
// }

//export default new DataSource(dataSourceOptions);
