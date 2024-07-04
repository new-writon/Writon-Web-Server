import { InternalServerErrorException } from "@nestjs/common";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class CalendarData{
    
    private calendarData: CalendarData[]

    constructor(calendarData: CalendarData[]){
        this.setCalendarData(calendarData)
    }

    setCalendarData(calendarData: CalendarData[]){
        if(calendarData === null)throw new InternalServerErrorException (`${__dirname} : calendarData값이 존재하지 않습니다.`);
        this.calendarData=calendarData
    }


    public static of(calendarData: CalendarData[]){
        return new CalendarData(calendarData);
    }


}