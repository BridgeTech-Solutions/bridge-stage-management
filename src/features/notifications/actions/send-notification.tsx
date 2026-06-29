// src/features/notifications/actions/send-notification.ts
import { sendEmail } from '@/shared/mail/resend-service';
import SubmissionConfirmationEmail from '../templates/SubmissionConfirmationEmail';
import StatusChangedEmail from '../templates/StatusChangedEmail';
import React from 'react';

// Fonction interne pour ne jamais bloquer l'exécution
const safeSend = async (params: any) => {
  try {
    await sendEmail(params);
  } catch (error) {
    console.error("❌ Notification email échouée (non bloquant) :", error);
  }
};

export const notifySubmission = async (email: string, name: string, code: string) => {
  await safeSend({
    to: email,
    subject: "Confirmation de candidature - Bridge",
    react: <SubmissionConfirmationEmail candidateName={name} trackingCode={code} />
  });
};

export const notifyStatusChange = async (email: string, name: string, status: string, code: string) => {
  await safeSend({
    to: email,
    subject: `Statut de votre candidature : ${status}`,
    react: <StatusChangedEmail candidateName={name} status={status} trackingCode={code} />
  });
};