import { CandidatureForm } from "@/features/candidature/components/CandidatureForm";

export const metadata = {
  title: "Candidature - Bridge Stage Management",
  description: "Postulez pour un stage académique ou professionnel",
};

/**
 * Page de candidature multi-étapes.
 * Cette page assemble le formulaire complet de candidature.
 */
export default function CandidaturePage() {
  return (
    <main className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3">
            Postulez pour un stage
          </h1>
          <p className="text-base-content/60 text-lg">
            Que vous cherchiez un stage académique ou professionnel, c'est ici que
            tout commence. Remplissez le formulaire ci-dessous, étape par étape.
          </p>
        </div>

        {/* Formulaire */}
        <CandidatureForm />
      </div>
    </main>
  );
}
