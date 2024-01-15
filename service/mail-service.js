import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "adxamjon0806@gmail.com",
        pass: "ywotdbjafibrsglt",
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: "adxamjon0806@gmail.com",
      to,
      subject:
        "Activation of account in https://sleepy-citadel-66676-f7bd094e4a58.herokuapp.com",
      text: "",
      html: `
      <div>
        <h1>For activation of your account please enter</h1>
        <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}

export default new MailService();
