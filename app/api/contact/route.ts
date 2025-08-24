import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import he from 'he'

// Zod schema for server-side validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.').max(100, 'Name must be no more than 100 characters long.'),
  email: z.string().email('Invalid email address.'),
  subject: z.string().min(2, 'Subject must be at least 2 characters long.').max(150, 'Subject must be no more than 150 characters long.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.').max(5000, 'Message must be no more than 5000 characters long.'),
})

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = contactSchema.safeParse(body)

    // 1. Validate the input
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input.', issues: validation.error.issues }, { status: 400 })
    }

    const { name, email, subject, message } = validation.data

    // 2. Sanitize inputs before using them in the email body
    const sanitizedName = he.encode(name)
    const sanitizedEmail = he.encode(email)
    const sanitizedSubject = he.encode(subject)
    const sanitizedMessage = he.encode(message)

    // Construct the email with sanitized data
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      replyTo: `${name} <${email}>`, // `replyTo` is safe; it's a header, not HTML
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${sanitizedSubject}`, // Sanitize subject just in case
      text: message, // The plain text version doesn't need sanitization
      // The HTML version requires sanitization to prevent XSS
      html: `<p>${sanitizedMessage.replace(/\n/g, '<br/>')}</p><hr/><p>From: ${sanitizedName} &lt;${sanitizedEmail}&gt;</p>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 