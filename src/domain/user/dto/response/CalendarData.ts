import { InternalServerErrorException } from "@nestjs/common";

export class CalendarData{
    private date: Date;
    private badge: string;

    constructor(date: Date, badge: string){
        this.setDate(date);
        this.setBadge(badge)
    }

    setDate(date: Date){
        if(date === null)throw new InternalServerErrorException (`${__dirname} : date값이 존재하지 않습니다.`);
        this.date=date
    }


    public static of(date: Date, badge: string){
        return new CalendarData(date, badge);
    }

    setBadge(badge: string){
        if(badge=== null)throw new InternalServerErrorException (`${__dirname} : badge 값이 존재하지 않습니다.`);
        this.badge=badge
    }
}