// On importe le contrat "Candidat" qu'on a créé dans l'autre fichier
import { Candidat } from './types';

// On crée et exporte la liste des candidats visibles sur ta maquette RH
export const listeCandidatsMock: Candidat[] = [
  {
    id: "1",
    nom: "Jean Dupont",
    email: "jean.dupont@email.com",
    role: "Dev Backend",
    evaluation: 4.8,
    dateEnvoi: "12 Oct, 2023",
    statut: "Accepté"
  },
  {
    id: "2",
    nom: "Marie Laurent",
    email: "m.laurent@gmail.com",
    role: "Chef de Projet",
    evaluation: 3.9,
    dateEnvoi: "14 Oct, 2023",
    statut: "En attente"
  },
  {
    id: "3",
    nom: "Thomas Bernard",
    email: "t.bernard@cloud.net",
    role: "Data Analyst",
    evaluation: 4.5,
    dateEnvoi: "15 Oct, 2023",
    statut: "Refusé"
  },
  {
    id: "4",
    nom: "Alice Girard",
    email: "a.girard@design.io",
    role: "UX Designer",
    evaluation: 4.9,
    dateEnvoi: "16 Oct, 2023",
    statut: "En attente"
  }
];