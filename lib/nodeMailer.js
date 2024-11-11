import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    }
})

export const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: process.env.SMTP_EMAIL,
}