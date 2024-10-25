import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function POST(request) {
    const { name, email, message } = await request.json();

    try {
        await transporter.sendMail({
            from: `"Grabbix Support" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Message from Website',
            text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        });

        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false, message: 'Error sending email' }), {
            status: 500,
        });
    }
}