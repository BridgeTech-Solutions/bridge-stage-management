// src/shared/mail/resend-service.ts
import { Resend } from 'resend';

// Vérifie bien que tu as une variable d'environnement RESEND_API_KEY dans ton .env
const resend = new Resend(process.env.RESEND_API_KEY);

// LE MOT-CLÉ "export" EST OBLIGATOIRE ICI
export const sendEmail = async ({ to, subject, html, react }: any) => {
  return await resend.emails.send({
    from: 'onboarding@resend.dev', // Remplace par ton email vérifié si nécessaire
    to: [to],
    subject: subject,
    html: html,
    react: react,
  });
};