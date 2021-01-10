import { MailService } from '@sendgrid/mail';
import Email from '../models/email.model';

const TOKEN: string = process.env.SENDGRID_AUTH_TOKEN;

class EmailService {
    mailService: MailService;

    constructor() {
        this.mailService = new MailService();
        this.mailService.setApiKey(TOKEN);
    }

    public async sendEmail(email: Email) {
        const response = await this.mailService.send(email);
        return response;
    }
}

export default EmailService;
