

export class PositionNames{

    private positionNames:string[]

    constructor(positionNames:string[]){
        this.setPositionNames(positionNames);
    }

    public static of (positionNames:string[]){
        return new PositionNames(positionNames);
    }

    private setPositionNames(positionNames:string[]){
        this.positionNames=positionNames;
    }
}