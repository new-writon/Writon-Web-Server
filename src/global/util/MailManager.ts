
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class MailManager{

  constructor(private readonly mailerService: MailerService) {}


    public async sendInvitationEmail(  
        organization: string,
        challengeId: number,
        email: string,
        challenge: string){
            try {
                const mailOptions = {
                  from: process.env.NODEEMAIL_FROM,
                  to: email,
                  subject: `[Writon] ${organization}의 챌린지에 참여해보세요`,
                  html: `
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center;">
                          <img src="https://writon-data.s3.ap-northeast-2.amazonaws.com/invitation/%EC%B4%88%EB%8C%80%EC%9E%A5+2.0.png" alt="Your Image" style="display: block; margin: 0 auto; margin-bottom: 20px; width: 500px; height: 500px;">
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align: center;">
                          <p style="font-size: 18px; color: #333; white-space: pre-line; line-height: 0.7;">
                            <strong style="font-weight: bold;">${organization}</strong>에서 ${email}님을 <br>
                            <strong style="font-weight: bold;">${challenge}</strong> 챌린지로 초대하였습니다<br>
                          </p> 
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align: center;">
                          <a href="${generateInvitationLink(organization, challengeId)}" style="display: block; text-align: center;"
                          target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.writon.co.kr/login?organization=${organization}&challengeId=${challengeId}">
                            <img src="https://writon-data.s3.ap-northeast-2.amazonaws.com/invitation/%EC%B4%88%EB%8C%80%EC%9E%A5+%EB%B2%84%ED%8A%BC+2.0.png" alt="Your Button Image" style="display: block; margin: 0 auto; width: 347px; height: 105px;">
                          </a>
                        </td>
                      </tr>
                    </table>
                  `,
                };
            
               
                this.mailerService.sendMail(mailOptions);
              } catch (err) {
                console.error(err);
              }        
    }

    public async sendCodeEmail (
        email: string,
        code: number
    ){
    const mailOptions = {
        from: "teamwritoner" + "@gmail.com",
        to: email,
        subject: '[Writon] 요청하신 서비스 이메일 인증 번호를 안내해드립니다.',
        html: `
        <p>본 메일은 Writon 서비스의 회원가입을 위한 이메일 인증입니다.</p>
        
        <p>진행 중인 화면에 인증번호를 정확히 입력해주세요.</p>
        
        <p>인증번호는 메일 발송 시점부터 3분 동안 유효합니다.</p>
        
        <p><strong>** 인증 코드 **</strong> : ${code}</p>
        `
    };

    this.mailerService.sendMail(mailOptions);

    }


public async randomPasswordsmtpSender(email: string, randomPassword: string){

  const mailOptions = {
    from: "teamwritoner" + "@gmail.com",
    to: email,
    subject: '[Writon] 임시 비밀번호 안내',
    html: `
      <p>안녕하세요, 라이톤 입니다. </p>
    
      <p>회원님의 임시 비밀번호는 다음과 같습니다.</p>
    
      <p>개인정보 보호를 위해 로그인 후 새로운 비밀번호로 변경해주시기 바랍니다.</p>

      <strong>임시비밀번호</strong>  : ${randomPassword}
      `
  };
  this.mailerService.sendMail(mailOptions);


}




}

// const sendInvitationEmail = async (
//   organization: string,
//   challengeId: number,
//   email: string,
//   challenge: string
// ) => {
//   try {
//     const mailOptions = {
//       from: process.env.NODEEMAIL_FROM,
//       to: email,
//       subject: `[Writon] ${organization}의 챌린지에 참여해보세요`,
//       html: `
//         <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
//           <tr>
//             <td style="text-align: center;">
//               <img src="https://writon-data.s3.ap-northeast-2.amazonaws.com/invitation/%EC%B4%88%EB%8C%80%EC%9E%A5+2.0.png" alt="Your Image" style="display: block; margin: 0 auto; margin-bottom: 20px; width: 500px; height: 500px;">
//             </td>
//           </tr>
//           <tr>
//             <td style="text-align: center;">
//               <p style="font-size: 18px; color: #333; white-space: pre-line; line-height: 0.7;">
//                 <strong style="font-weight: bold;">${organization}</strong>에서 ${email}님을 <br>
//                 <strong style="font-weight: bold;">${challenge}</strong> 챌린지로 초대하였습니다<br>
//               </p> 
//             </td>
//           </tr>
//           <tr>
//             <td style="text-align: center;">
//               <a href="${generateInvitationLink(organization, challengeId)}" style="display: block; text-align: center;"
//               target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.writon.co.kr/login?organization=${organization}&challengeId=${challengeId}">
//                 <img src="https://writon-data.s3.ap-northeast-2.amazonaws.com/invitation/%EC%B4%88%EB%8C%80%EC%9E%A5+%EB%B2%84%ED%8A%BC+2.0.png" alt="Your Button Image" style="display: block; margin: 0 auto; width: 347px; height: 105px;">
//               </a>
//             </td>
//           </tr>
//         </table>
//       `,
//     };

//     await smtpTransport.sendMail(mailOptions);
//   } catch (err) {
//     console.error(err);
//   }
// };



// const sendCodeEmail = async (
//   email: string,
//   code: number
// ) => {

//   const mailOptions = {
//     from: "teamwritoner" + "@gmail.com",
//     to: email,
//     subject: '[Writon] 요청하신 서비스 이메일 인증 번호를 안내해드립니다.',
//     html: `
//       <p>본 메일은 Writon 서비스의 회원가입을 위한 이메일 인증입니다.</p>
    
//       <p>진행 중인 화면에 인증번호를 정확히 입력해주세요.</p>
    
//       <p>인증번호는 메일 발송 시점부터 3분 동안 유효합니다.</p>
    
//       <p><strong>** 인증 코드 **</strong> : ${code}</p>
//       `
//   };

//   smtpTransport.sendMail(mailOptions);

//   smtpTransport.close();

// }




const generateInvitationLink = (
  organization: string, 
  challengeId: number
  ) => {
  const baseUrl = 'https://www.writon.co.kr/login';
  const link = `${baseUrl}?organization=${encodeURIComponent(organization)}&challengeId=${encodeURIComponent(challengeId)}`;
  return link;
}



// export default {
//   randomPasswordsmtpSender,
//   sendCodeEmail,
//   sendInvitationEmail
// }




