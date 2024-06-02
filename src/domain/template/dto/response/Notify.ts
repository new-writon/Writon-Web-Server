// import { InternalServerErrorException } from "@nestjs/common";


// export class Notify{

//     private commentShape: GetCommentNotify;
//     private likeShape: GetLikeNotify;
//   //  private notifyShape: (GetCommentNotify | GetLikeNotify)[];


//     constructor(notifyShape: (GetCommentNotify | GetLikeNotify)[]){
//         this.setNotifyShape(notifyShape);
//     }

//     public static of(notify:(GetCommentNotify | GetLikeNotify)[]){
//         return new Notify(notify)
//     }


//     private setNotifyShape(notifyShape: (GetCommentNotify | GetLikeNotify)[]){
//         if(notifyShape === null)throw new InternalServerErrorException (`${__dirname} : notifyShape 값이 존재하지 않습니다.`); 
//         this.notifyShape=notifyShape;
//     }

//     // private setCommentShape(commentShape: GetCommentNotify){
//     //     if(commentShape === null)throw new InternalServerErrorException (`${__dirname} : commentShape 값이 존재하지 않습니다.`);
//     //     this.commentShape=commentShape;
//     // }

//     // private setLikeShape(likeShape: GetLikeNotify){
//     //     if(likeShape === null)throw new InternalServerErrorException (`${__dirname} : likeShape 값이 존재하지 않습니다.`);
//     //     this.likeShape=likeShape;
//     // }
// }