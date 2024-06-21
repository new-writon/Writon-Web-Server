

export class LikeCount{
    
    private likeCount:number;

    constructor(likeCount:number){
        this.setLikeCount(likeCount);
    }

    public static of(likeCount:number){
        return new LikeCount(likeCount);
    }

    private setLikeCount(likeCount:number){
        this.likeCount=likeCount;
    }
}