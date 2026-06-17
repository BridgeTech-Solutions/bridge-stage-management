import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-xl card bg-base-200 p-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-primary mb-4">Bridge Technologies</h1>
        <p className="text-base-content/70 mb-8">
          Bienvenue sur la plateforme officielle de gestion des demandes de stage. 
          Veuillez sélectionner votre espace pour continuer.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Bouton pour les futurs stagiaires (on créera la page plus tard) */}
          <button className="btn btn-primary btn-lg text-white">
            Espace Stagiaire
          </button>
          
          {/* Bouton pour aller sur l'administration RH qu'on vient de déplacer */}
          <Link href="/admin" className="btn btn-secondary btn-lg">
            Espace Admin RH
          </Link>
        </div>
      </div>
    </main>
  );
}