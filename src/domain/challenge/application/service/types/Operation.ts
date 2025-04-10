export type ChallengeOperation = InformationOperation | InviteOperation | QuestionOperation;

type InformationOperation =
  | 'SELECT_ALL_CHALLENGE'
  | 'SELECT_CHALLENGE_STATUS'
  | 'SELECT_CHALLENGE_DATE'
  | 'CHECK_CHALLENGE_DAY';

type InviteOperation = 'SEND_INVITATION';

type QuestionOperation = 'SELECT_BASIC_QUESTION' | 'SELECT_SPECIAL_QUESTION';
