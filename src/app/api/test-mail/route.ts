import { NextResponse } from 'next/server';
import { sendEmail } from '@/shared/mail/resend-service';

export async function GET() {
  try {
    const data = await sendEmail({
      to: 'itouayohann31@gmail.com', // J'ai corrigé la coquille dans le mail
      subject: 'Test Resend',
      html: '<h1>Ça fonctionne !</h1><p>L\'envoi via Resend est opérationnel.</p>'
    });
    return NextResponse.json({ message: "Email envoyé !", data });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}