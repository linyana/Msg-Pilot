import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendExportSubmissionMail(mail_address: string, file_url: string | false) {
    return this.mailerService.sendMail({
      to: mail_address,
      from: `Pauto-send-message Team ${process.env.FROM_EMAIL}`,
      subject: 'Download Submissions Export File',
      context: {
        email: mail_address,
        export_submissions_url: `${process.env.BASE_APP_BE_URL}/api/v1/redirect-middleware?ExpirationTime=${new Date().getTime() + 600000}&fileURL=${file_url}`,
      },
      template: 'export_submissions.ejs',
    });
  }
}
