import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* En-tête */}
      <header className="navbar bg-base-100 border-b border-base-300 px-4 sm:px-8">
        <div className="flex-1">
          <Image
            src="/logo-bridge.png"
            alt="Bridge Technologies Solutions"
            width={150}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </div>
        <div className="flex-none">
          {/* Ton lien vers l'admin est bien ici */}
          <Link href="/admin" className="btn btn-ghost btn-sm text-secondary font-semibold">
            Espace RH
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero bg-gradient-to-b from-base-300 to-base-200 py-20">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary">
              Gérez vos demandes de stage en toute simplicité
            </h1>
            <p className="py-6 text-base-content/70 text-lg">
              Postulez à un stage académique ou professionnel, suivez votre
              dossier en temps réel, et laissez notre équipe vous accompagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/candidature" className="btn btn-primary btn-lg">
                Déposer ma candidature
              </Link>
              <Link href="/suivi" className="btn btn-outline btn-lg">
                Suivre ma demande
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-secondary mb-10">
          Comment ça marche ?
        </h2>
        <ul className="steps steps-vertical sm:steps-horizontal w-full">
          <li className="step step-primary">Je remplis le formulaire</li>
          <li className="step step-primary">Je joins mes documents</li>
          <li className="step">Je reçois mon code de suivi</li>
          <li className="step">Je suis informé(e) par email</li>
        </ul>
      </section>

      {/* Pied de page */}
      <footer className="footer footer-center bg-secondary text-secondary-content p-6">
        <aside>
          <p className="font-medium">Bridge Technologies Solutions</p>
          <p className="text-sm opacity-80">
            We drive your digital transformation
          </p>
        </aside>
      </footer>
    </main>
  );
}