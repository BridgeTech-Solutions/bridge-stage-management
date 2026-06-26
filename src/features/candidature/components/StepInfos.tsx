"use client";

import type { Step1InfosInput } from "../schema";

interface StepInfosProps {
  data: Partial<Step1InfosInput>;
  onChange: (field: keyof Step1InfosInput, value: string) => void;
  errors?: Record<string, string>;
}

export function StepInfos({ data, onChange, errors = {} }: StepInfosProps) {
  // Liste propre et standardisée pour le recrutement
  const studyLevels = [
    "Licence 1",
    "Licence 2",
    "Licence 3 / Bachelor",
    "Ingénieur 1ère année",
    "Ingénieur 2ème année",
    "Ingénieur 3ème année",
    "Master 1",
    "Master 2",
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* --- PRÉNOM & NOM --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Prénom <span className="text-error">*</span></span>
          </label>
          <input
            type="text"
            placeholder="Votre prénom"
            className={`input input-bordered ${errors.firstName ? "input-error" : ""}`}
            value={data.firstName || ""}
            onChange={(e) => onChange("firstName", e.target.value)}
            required
          />
          {errors.firstName && (
            <label className="label"><span className="label-text-alt text-error">{errors.firstName}</span></label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Nom <span className="text-error">*</span></span>
          </label>
          <input
            type="text"
            placeholder="Votre nom"
            className={`input input-bordered ${errors.lastName ? "input-error" : ""}`}
            value={data.lastName || ""}
            onChange={(e) => onChange("lastName", e.target.value)}
            required
          />
          {errors.lastName && (
            <label className="label"><span className="label-text-alt text-error">{errors.lastName}</span></label>
          )}
        </div>
      </div>

      {/* --- EMAIL --- */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Email <span className="text-error">*</span></span>
        </label>
        <input
          type="email"
          placeholder="votre@email.com"
          className={`input input-bordered ${errors.email ? "input-error" : ""}`}
          value={data.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        {errors.email && (
          <label className="label"><span className="label-text-alt text-error">{errors.email}</span></label>
        )}
      </div>

      {/* --- NUMÉRO DE TÉLÉPHONE (Standard unique Cameroun) --- */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Numéro de téléphone <span className="text-error">*</span></span>
        </label>
        <input
          type="tel"
          placeholder="Ex: 691234567"
          className={`input input-bordered ${errors.phone ? "input-error" : ""}`}
          value={data.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          required
        />
        <p className="text-xs text-base-content/50 mt-1">
          Uniquement un numéro camerounais valide à 9 chiffres (ex: 69XXXXXXX, 67XXXXXXX).
        </p>
        {errors.phone && (
          <label className="label"><span className="label-text-alt text-error">{errors.phone}</span></label>
        )}
      </div>

      {/* --- ÉCOLE / UNIVERSITÉ --- */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">École / Université <span className="text-error">*</span></span>
        </label>
        <input
          type="text"
          placeholder="Ex: Ucac-Icam"
          className={`input input-bordered ${errors.school ? "input-error" : ""}`}
          value={data.school || ""}
          onChange={(e) => onChange("school", e.target.value)}
          required
        />
        {errors.school && (
          <label className="label"><span className="label-text-alt text-error">{errors.school}</span></label>
        )}
      </div>

      {/* --- FILIÈRE & NIVEAU D'ÉTUDES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Filière <span className="text-error">*</span></span>
          </label>
          <input
            type="text"
            placeholder="Ex: Informatique / Réseaux"
            className={`input input-bordered ${errors.field ? "input-error" : ""}`}
            value={data.field || ""}
            onChange={(e) => onChange("field", e.target.value)}
            required
          />
          {errors.field && (
            <label className="label"><span className="label-text-alt text-error">{errors.field}</span></label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Niveau d'études <span className="text-error">*</span></span>
          </label>
          <select
            className={`select select-bordered w-full ${errors.level ? "select-error" : ""}`}
            value={data.level || ""}
            onChange={(e) => onChange("level", e.target.value)}
            required
          >
            <option value="" disabled>
              Sélectionnez votre niveau
            </option>
            {studyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <label className="label"><span className="label-text-alt text-error">{errors.level}</span></label>
          )}
        </div>
      </div>
    </div>
  );
}