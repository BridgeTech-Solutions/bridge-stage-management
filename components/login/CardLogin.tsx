// Dis à Next.js que ce composant gère des interactions utilisateur (clics, saisies)
'use client';

import { useState } from 'react';

export default function CardLogin() {
  // État pour savoir quel profil est sélectionné (Par défaut : Candidats)
  const [profil, setProfil] = useState<'Candidats' | 'RH' | 'Experts IT'>('Candidats');

  return (
    <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-2xl border border-base-300 text-neutral">
      {/* En-tête */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Bienvenue sur Bridge Tech</h2>
        <p className="text-sm text-base-content/60 mt-1">Connectez-vous à votre espace professionnel.</p>
      </div>

      {/* Sélecteur de profil (Les 3 boutons de ta maquette) */}
      <div className="form-control mb-6">
        <label className="label text-xs font-bold tracking-wide uppercase text-base-content/60 mb-2">
          Choisissez votre profil
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Candidats', 'RH', 'Experts IT'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setProfil(p)}
              className={`btn btn-outline btn-sm normal-case flex flex-col h-16 py-2 ${
                profil === p ? 'btn-primary border-2' : 'border-base-300 text-base-content/70'
              }`}
            >
              <span className="text-xs font-semibold">{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Formulaire classique */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="label text-xs font-semibold text-base-content/70">
            {profil === 'Candidats' ? 'Email personnel' : 'Email professionnel'}
          </label>
          <input 
            type="email" 
            placeholder="nom@entreprise.com" 
            className="input input-bordered w-full focus:input-primary" 
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="label text-xs font-semibold text-base-content/70 p-0">Mot de passe</label>
            <a href="#" className="text-xs text-primary hover:underline">Mot de passe oublié ?</a>
          </div>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="input input-bordered w-full focus:input-primary" 
          />
        </div>

        {/* Se souvenir de moi */}
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3 p-0">
            <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded" />
            <span className="label-text text-sm text-base-content/70">Se souvenir de moi</span>
          </label>
        </div>

        {/* Bouton de connexion principal */}
        <button type="submit" className="btn btn-primary w-full text-white tracking-wide font-bold mt-2">
          Se connecter
        </button>
      </form>

      {/* Séparateur */}
      <div className="divider text-xs text-base-content/40 my-6">OU SE CONNECTER AVEC</div>

      {/* Boutons SSO (Google & Azure AD) */}
      <div className="grid grid-cols-2 gap-3">
        <button className="btn btn-outline border-base-300 font-medium normal-case text-sm">
          Google
        </button>
        <button className="btn btn-outline border-base-300 font-medium normal-case text-sm">
          Azure AD
        </button>
      </div>

      {/* Inscription */}
      <div className="text-center mt-6 text-sm text-base-content/60">
        Pas encore de compte ? <a href="#" className="text-primary font-semibold hover:underline">S'inscrire</a>
      </div>
    </div>
  );
}