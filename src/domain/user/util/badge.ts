import { ChallengeDay } from '../../challenge/domain/entity/ChallengeDay';
import { UserTemplate } from '../../template/domain/entity/UserTemplate';

const sortCallendarDateBadge = (
  challengeDays: ChallengeDay[],
  userTemplateDays: UserTemplate[],
) => {
  const result = [];
  for (const challengeDay of challengeDays) {
    const hasMatchingDate = userTemplateDays!.some((userTemplateDay) =>
      isSameDate(
        new Date(challengeDay.getDay()),
        new Date(userTemplateDay.getTemplateDate()),
      ),
    );

    const customObject: { date: string; badge?: string } = {
      date: challengeDay.day,
    };

    if (hasMatchingDate) {
      const matchingUserTemplateDays = userTemplateDays!.filter(
        (userTemplateDays) =>
          isSameDate(
            new Date(challengeDay.getDay()),
            new Date(userTemplateDays.getTemplateDate()),
          ),
      );
      for (const matchingUserTemplateDay of matchingUserTemplateDays) {
        if (matchingUserTemplateDay.getComplete()) {
          customObject['badge'] = 'Gold';
        } else {
          customObject['badge'] = 'Silver';
        }
        result.push({ ...customObject });
      }
    } else if (isSameDate(new Date(challengeDay.getDay()), new Date())) {
      customObject['badge'] = 'Purple';
      result.push({ ...customObject });
    } else if (new Date(challengeDay.getDay()) < new Date()) {
      customObject['badge'] = 'lightPurple';
      result.push({ ...customObject });
    } else {
      customObject['badge'] = 'temporary';
      result.push({ ...customObject });
    }
  }
  return result;
};

const isSameDate = (firstDate: Date, secondDate: Date): boolean => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

export { sortCallendarDateBadge, isSameDate };
