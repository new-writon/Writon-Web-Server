import { CalendarData } from './CalendarData';

export class Calendar {
  private datas: CalendarData[];

  constructor(datas: CalendarData[]) {
    this.setCalendarData(datas);
  }

  public static of(datas: CalendarData[]) {
    return new Calendar(datas);
  }

  setCalendarData(data: CalendarData[]) {
    this.datas = data;
  }
}
