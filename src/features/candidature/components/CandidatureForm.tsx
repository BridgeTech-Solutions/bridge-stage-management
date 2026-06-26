"use client";

import { useState, useActionState, useRef, startTransition, useEffect } from "react";
import type { InternshipType } from "@prisma/client";
import { submitCandidature, type ActionState } from "../actions";
import { step1InfosSchema, step2ParcoursSchema } from "../schema";
import type { Step1InfosInput, Step2ParcoursInput } from "../schema";
import { StepInfos } from "./StepInfos";
import { StepParcours } from "./StepParcours";
import { StepDocuments } from "./StepDocuments";
import { StepValidation } from "./StepValidation";
import { SuccessScreen } from "./SuccessScreen";

export type CurrentStep = 1 | 2 | 3 | 4;

const LOCAL_STORAGE_KEY_STEP1 = "candidature_step1_data";
const LOCAL_STORAGE_KEY_STEP2 = "candidature_step2_data";

export function CandidatureForm() {
  // État du formulaire multi-étapes
  const [currentStep, setCurrentStep] = useState<CurrentStep>(1);

  // États des données initialisés à vide (le rechargement se fera dans le useEffect)
  const [step1Data, setStep1Data] = useState<Partial<Step1InfosInput>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "",
    field: "",
    level: "",
  });
  const [step2Data, setStep2Data] = useState<Partial<Step2ParcoursInput>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Map<string, File>>(
    new Map()
  );

  // État des erreurs de validation locales
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  // Server Action
  const [actionState, formAction, isPending] = useActionState<ActionState, FormData>(
    submitCandidature,
    {}
  );

  // --- EFFET : Récupérer les données sauvegardées au chargement de la page ---
  useEffect(() => {
    try {
      const savedStep1 = localStorage.getItem(LOCAL_STORAGE_KEY_STEP1);
      if (savedStep1) {
        setStep1Data(JSON.parse(savedStep1));
      }
      
      const savedStep2 = localStorage.getItem(LOCAL_STORAGE_KEY_STEP2);
      if (savedStep2) {
        setStep2Data(JSON.parse(savedStep2));
      }
    } catch (e) {
      console.error("Erreur lors de la récupération du localStorage :", e);
    }
  }, []);

  // Gestion du changement de champ (étape 1) + Persistance
  const handleStep1Change = (field: keyof Step1InfosInput, value: string) => {
    const newData = { ...step1Data, [field]: value };
    setStep1Data(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP1, JSON.stringify(newData));
    
    if (step1Errors[field]) {
      const testData = { ...step1Data, [field]: value };
      const result = step1InfosSchema.safeParse(testData);
      if (result.success || !result.error.issues.some(issue => issue.path[0] === field)) {
        const newErrors = { ...step1Errors };
        delete newErrors[field];
        setStep1Errors(newErrors);
      }
    }
  };

  // Gestion du changement de champ (étape 2) + Persistance
  const handleStep2Change = (field: keyof Step2ParcoursInput, value: string | boolean) => {
    const newData = { ...step2Data, [field]: value };
    setStep2Data(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP2, JSON.stringify(newData));
    
    if (step2Errors[field]) {
      const testData = { ...step2Data, [field]: value };
      const result = step2ParcoursSchema.safeParse(testData);
      if (result.success || !result.error.issues.some(issue => issue.path[0] === field)) {
        const newErrors = { ...step2Errors };
        delete newErrors[field];
        setStep2Errors(newErrors);
      }
    }
  };

  // Validation complète de l'étape 1
  const validateStep1 = (): boolean => {
    const result = step1InfosSchema.safeParse(step1Data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0] as string] = issue.message;
      });
      setStep1Errors(errors);
      return false;
    }
    setStep1Errors({});
    return true;
  };

  // Validation complète de l'étape 2
  const validateStep2 = (): boolean => {
    const result = step2ParcoursSchema.safeParse(step2Data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0] as string] = issue.message;
      });
      setStep2Errors(errors);
      return false;
    }
    setStep2Errors({});
    return true;
  };

  const validateStep3 = (): boolean => {
    const internshipType = step2Data.internshipType as InternshipType | undefined;
    if (!internshipType) return false;
    return uploadedFiles.size > 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as CurrentStep);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    Object.entries(step1Data).forEach(([key, value]) => {
      formData.set(key, String(value));
    });

    Object.entries(step2Data).forEach(([key, value]) => {
      formData.set(
        key,
        typeof value === "boolean" ? (value ? "true" : "false") : String(value)
      );
    });

    uploadedFiles.forEach((file, label) => {
      const key = `documents_${label.replace(/\s+/g, "_")}`;
      formData.append(key, file);
    });

    startTransition(() => {
      formAction(formData);
    });
  };

  // En cas de succès -> Nettoyer le localStorage
  if (actionState.success && actionState.trackingCode) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_STEP1);
    localStorage.removeItem(LOCAL_STORAGE_KEY_STEP2);

    return (
      <SuccessScreen
        trackingCode={actionState.trackingCode}
        email={step1Data.email}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {actionState.error && !isPending && (
        <div className="alert alert-error mb-6">
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
              d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{actionState.error}</span>
        </div>
      )}

      {isPending ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/60">Envoi de votre candidature...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 mx-1 rounded-full ${
                    step === currentStep
                      ? "bg-primary"
                      : step < currentStep
                        ? "bg-success"
                        : "bg-base-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-base-content/60">
              <span>Infos</span>
              <span>Parcours</span>
              <span>Documents</span>
              <span>Validation</span>
            </div>
          </div>

          <div className="mb-6">
            {/* --- TITRE DYNAMIQUE AVEC LES NOUVELLES ICÔNES PROPRES --- */}
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              {currentStep === 1 && (
                <>
                  <img 
                    src="/images/from.image.dossier.png" 
                    alt="Icône informations" 
                    className="w-8 h-8 object-contain"
                  />
                  <span>Vos informations personnelles</span>
                </>
              )}
              
              {currentStep === 2 && (
                <>
                  <img 
                    src="/images/from.image.niveaux scolaire.png" 
                    alt="Icône parcours" 
                    className="w-8 h-8 object-contain"
                  />
                  <span>Votre parcours et le stage</span>
                </>
              )}
              
              {currentStep === 3 && (
                <>
                  <img 
                    src="/images/from.image.vos documents.png" 
                    alt="Icône documents" 
                    className="w-8 h-8 object-contain"
                  />
                  <span>Vos documents</span>
                </>
              )}
              
              {currentStep === 4 && (
                <>
                  <img 
                    src="/images/from.image.verification.png" 
                    alt="Icône vérification" 
                    className="w-8 h-8 object-contain"
                  />
                  <span>Vérification finale</span>
                </>
              )}
            </h2>
            
            <p className="text-base-content/60">
              {currentStep === 1 && "Commençons par vos informations de contact."}
              {currentStep === 2 && "Parlez-nous de votre formation et du stage souhaité."}
              {currentStep === 3 && "Uploadez les documents requis pour votre candidature."}
              {currentStep === 4 && "Vérifiez vos informations avant d'envoyer."}
            </p>
          </div>

          <div className="mb-8">
            {currentStep === 1 && (
              <StepInfos
                data={step1Data}
                onChange={handleStep1Change}
                errors={step1Errors}
              />
            )}

            {currentStep === 2 && (
              <StepParcours
                data={step2Data}
                onChange={handleStep2Change}
                errors={step2Errors}
              />
            )}

            {currentStep === 3 && (
              <StepDocuments
                internshipType={step2Data.internshipType as InternshipType | undefined}
                onFilesChange={setUploadedFiles}
                uploadedFiles={uploadedFiles}
              />
            )}

            {currentStep === 4 && (
              <StepValidation
                step1={step1Data}
                step2={step2Data}
                uploadedFilesCount={uploadedFiles.size}
              />
            )}
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="btn btn-outline flex-1"
            >
              ← Précédent
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary flex-1"
              >
                Suivant →
              </button>
            ) : (
              <button
                type="submit"
                disabled={uploadedFiles.size === 0}
                className="btn btn-success flex-1"
              >
                ✓ Envoyer ma candidature
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
}