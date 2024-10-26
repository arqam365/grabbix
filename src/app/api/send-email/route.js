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
            subject: 'New Product Query from Grabbix Store',

            text: `
Hello Grabbix Support Team,

You have received a new product-related inquiry from a customer. Below are the details of the message:

Customer Information:
- **Name**: ${name}
- **Email**: ${email}

Customer's Message:
---------------------------------------
${message}
---------------------------------------

Please review the customer's inquiry and provide a response promptly. If additional information or actions are required, kindly coordinate with the relevant department.

Thank you for attending to this matter.

Best Regards,
Grabbix Store Automated Notification System
`
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