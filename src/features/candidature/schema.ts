import { z } from "zod";

// ==========================================
// 1. Schémas (La définition des données)
// ==========================================
export const step1InfosSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(9, "Le numéro de téléphone est requis"),
});

export const step2ParcoursSchema = z.object({
  school: z.string().min(2, "L'école est requise"),
  field: z.string().min(2, "La filière est requise"),
  level: z.string().min(1, "Le niveau d'étude est requis"),
  internshipType: z.enum(["ACADEMIC", "PROFESSIONAL"]),
  duration: z.string().min(1, "La durée du stage est requise"),
  startDate: z.string().min(1, "La date de début souhaitée est requise"), 
  reportRequired: z.boolean(),
});

export const completeApplicationSchema = z.object({
  ...step1InfosSchema.shape,
  ...step2ParcoursSchema.shape,
});

// ==========================================
// 2. Types (La signature pour tes composants)
// ==========================================
export type Step1InfosInput = z.infer<typeof step1InfosSchema>;
export type Step2ParcoursInput = z.infer<typeof step2ParcoursSchema>;
export type CompleteApplicationInput = z.infer<typeof completeApplicationSchema>;