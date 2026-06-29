import nodemailer from 'nodemailer';

// On affiche ce qui est chargé au démarrage
console.log("--- DEBUG SMTP CONFIG ---");
console.log("Host:", process.env.SMTP_HOST);
console.log("User:", process.env.SMTP_USER);
console.log("Pass:", process.env.SMTP_PASS ? "Longueur=" + process.env.SMTP_PASS.length : "VIDE");
console.log("-------------------------");

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 2525, // On force le 2525
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});