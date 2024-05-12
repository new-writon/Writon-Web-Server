import { InternalServerErrorException } from "@nestjs/common";
import { CalendarData } from "./CalendarData";

export class Calendar{
    private data: CalendarData[];


    constructor(data: CalendarData[]){
        this.setCalendarData(data); 
    }

    public static of(data: CalendarData[]){
        return new Calendar(data);
    }

    setCalendarData(data: CalendarData[]){
        this.data=data
    }

 
}