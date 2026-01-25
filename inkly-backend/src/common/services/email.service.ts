import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // For production, configure with real SMTP settings
    // For development, you can use services like Mailtrap or Ethereal
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: this.configService.get<string>('SMTP_FROM', 'noreply@inkly.com'),
        to,
        subject,
        text: text || subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent to ${to}: ${info.messageId}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const html = `
      <h1>Welcome to Inkly!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining Inkly. We're excited to have you on board!</p>
      <p>Start exploring our amazing products and create something unique.</p>
      <p>Happy shopping!</p>
      <p>The Inkly Team</p>
    `;

    return this.sendEmail(email, 'Welcome to Inkly!', html);
  }

  async sendOrderConfirmationEmail(
    email: string,
    name: string,
    orderId: string,
    total: number,
  ): Promise<boolean> {
    const html = `
      <h1>Order Confirmation</h1>
      <p>Hi ${name},</p>
      <p>Thank you for your order!</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      <p>We'll send you another email when your order ships.</p>
      <p>Thank you for shopping with Inkly!</p>
    `;

    return this.sendEmail(email, `Order Confirmation - ${orderId}`, html);
  }

  async sendOrderStatusUpdateEmail(
    email: string,
    name: string,
    orderId: string,
    status: string,
  ): Promise<boolean> {
    const html = `
      <h1>Order Status Update</h1>
      <p>Hi ${name},</p>
      <p>Your order status has been updated.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>New Status:</strong> ${status}</p>
      <p>Thank you for shopping with Inkly!</p>
    `;

    return this.sendEmail(email, `Order Update - ${orderId}`, html);
  }
}
