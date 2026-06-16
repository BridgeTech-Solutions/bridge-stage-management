"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SuccessScreenProps {
  trackingCode: string;
  email?: string;
}

export function SuccessScreen({ trackingCode, email }: SuccessScreenProps) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowToast(false), 4500);
    return () => window.clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
    alert("Code de suivi copié !");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {showToast && (
        <div className="fixed top-6 right-6 z-50">
          <div className="toast toast-success">
            <div>
              <span>✅ Candidature envoyée avec succès !</span>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-md w-full text-center">
        {/* Icône de succès */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/20 rounded-full">
            <svg
              className="w-10 h-10 text-success"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Titre et description */}
        <h1 className="text-3xl font-bold mb-3">Candidature envoyée !</h1>
        <p className="text-base-content/60 mb-6">
          Merci pour votre candidature. Notre équipe RH va l'examiner rapidement.
        </p>

        {/* Code de suivi */}
        <div className="bg-base-200 rounded-lg p-6 mb-6">
          <p className="text-sm font-semibold text-base-content/60 mb-2">
            Votre code de suivi
          </p>
          <div className="flex items-center justify-between gap-3">
            <code className="text-2xl font-mono font-bold text-primary">
              {trackingCode}
            </code>
            <button
              onClick={copyToClipboard}
              className="btn btn-sm btn-ghost"
              title="Copier"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-base-content/60 mt-3">
            Utilisez ce code pour suivre votre demande
          </p>
        </div>

        {/* Informations d'email */}
        {email && (
          <div className="alert alert-info mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              Un email contenant votre code de suivi a été envoyé à{" "}
              <strong>{email}</strong>
            </span>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex flex-col gap-3">
          <Link href="/suivi" className="btn btn-primary">
            🔍 Suivre ma candidature
          </Link>
          <Link href="/" className="btn btn-outline">
            Retourner à l'accueil
          </Link>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-base-200/50 rounded-lg text-left">
          <p className="text-xs font-semibold text-base-content/60 mb-2">
            ℹ️ À retenir
          </p>
          <ul className="text-xs text-base-content/60 space-y-1 list-disc list-inside">
            <li>Votre code de suivi est unique et non transférable</li>
            <li>Conservez-le pour consulter l'état de votre dossier</li>
            <li>
              Notre équipe reviendra vers vous dans les 5 à 10 jours ouvrables
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
