import { IsNotEmpty } from "class-validator";


export class LikeCheck{

    @IsNotEmpty()
    private likeId: number;

    public getLikeId(){
        return this.likeId;
    }
}