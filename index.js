import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://luissanteliz.dev' }));

const resend = new Resend(process.env.API_KEY_RESEND);

// Routes
app.post('/send-email', async (req, res) => {
  const { subject, text } = req.body;

  try {
    // Using Resend to send email
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'luissanteliz22@gmail.com',
      subject: subject,
      text: text,
    });

    console.log('Email sent successfully:', response);
    res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 