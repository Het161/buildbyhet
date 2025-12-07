import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Log the form data (for now)
    console.log('📧 Contact Form Submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // TODO: Add email sending service here
    // Example integrations:
    // - Resend (recommended): https://resend.com
    // - SendGrid: https://sendgrid.com
    // - Nodemailer with Gmail
    // - EmailJS (client-side)

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true,
      message: 'Message received successfully!' 
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
