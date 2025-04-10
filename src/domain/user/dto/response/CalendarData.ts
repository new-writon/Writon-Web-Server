import { InternalServerErrorException } from '@nestjs/common';

export class CalendarData {
  private calendarData: CalendarData[];
  private calendarWithGrayData: CalendarData[];

  constructor(calendarData: CalendarData[], calendarWithGrayData: CalendarData[]) {
    this.setCalendarData(calendarData);
    this.setCalendarWithGrayData(calendarWithGrayData);
  }

  setCalendarData(calendarData: CalendarData[]) {
    if (calendarData === null)
      throw new InternalServerErrorException(`${__dirname} : calendarData값이 존재하지 않습니다.`);
    this.calendarData = calendarData;
  }

  setCalendarWithGrayData(calendarWithGrayData: CalendarData[]) {
    if (calendarWithGrayData === null)
      throw new InternalServerErrorException(`${__dirname} : calendarData값이 존재하지 않습니다.`);
    this.calendarWithGrayData = calendarWithGrayData;
  }

  public static of(calendarData: CalendarData[], calendarWithGrayData: CalendarData[]) {
    return new CalendarData(calendarData, calendarWithGrayData);
  }
}
