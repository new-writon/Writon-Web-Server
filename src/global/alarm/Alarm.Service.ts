import { Injectable } from "@nestjs/common";
import { firebase } from '../config/firebase';

@Injectable()
export class AlarmService {

    public async sendPushAlarm(engineValue:string, title:string, body:string){
        const message = {
            token: engineValue,
            notification: {
              title: title,
              body: body,
            },
          };
          const response = await firebase.messaging().send(message);
          console.log('Successfully sent message:', response);
    }

}