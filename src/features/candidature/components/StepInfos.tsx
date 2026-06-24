"use client";

import type { Step1InfosInput } from "../schema";

interface StepInfosProps {
  data: Partial<Step1InfosInput>;
  onChange: (field: keyof Step1InfosInput, value: string) => void;
  errors?: Record<string, string>;
}

export function StepInfos({ data, onChange, errors = {} }: StepInfosProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prénom */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Prénom <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Votre prénom"
            className={`input input-bordered ${
              errors.firstName ? "input-error" : ""
            }`}
            value={data.firstName || ""}
            onChange={(e) => onChange("firstName", e.target.value)}
            required
          />
          {errors.firstName && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.firstName}
              </span>
            </label>
          )}
        </div>

        {/* Nom */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Nom <span className="text-error">*</span>
            </span>
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
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.lastName}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">
            Email <span className="text-error">*</span>
          </span>
        </label>
        <input
          type="email"
          placeholder="votre.adresse@email.com"
          className={`input input-bordered ${errors.email ? "input-error" : ""}`}
          value={data.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        {errors.email && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.email}</span>
          </label>
        )}
      </div>

      {/* Téléphone (Principal) - CORRIGÉ ICI */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">
            Téléphone (Principal) <span className="text-error">*</span>
          </span>
        </label>
        <input
          type="tel"
          placeholder="+237 677 88 99 00"
          className={`input input-bordered ${errors.phone ? "input-error" : ""}`}
          value={data.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          required
        />
        {errors.phone && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.phone}</span>
          </label>
        )}
      </div>

      {/* Message d'information */}
      <div className="alert alert-info text-sm">
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
          Le numéro de téléphone est requis. Pensez à inclure l'indicatif international (ex: <strong>+237</strong>).
        </span>
      </div>
    </div>
  );
}