/*
import nodemailer from 'nodemailer'
export const POST = async (request) => {
    const {email, otp} = await request.json()
    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASS
            }, 
        })
        const mailOptions = {
            from: process.env.GMAIL,
            to: "nhokuzumaki2003@gmail.com",
            subject: '',
            html: "",
        }
        transporter.sendMail(mailOptions)
    }
    catch (error) {
        return new Response("Error!", {status: 500})
    }
}
*/