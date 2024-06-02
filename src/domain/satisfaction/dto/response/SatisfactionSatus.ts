

export class SatisfactionStatus{

    private review:number;

    constructor(review:number){
        this.setReview(review);
    }

    public static of(review:number){
        return new SatisfactionStatus(review);
    }


    private setReview(review:number){
        this.review=review;
    }
}