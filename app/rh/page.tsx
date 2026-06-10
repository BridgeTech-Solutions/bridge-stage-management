"use client"
import React from 'react';
import { listeCandidatsMock } from '@/lib/mockData'; // Corrigé ici !

export default function EspaceRH() {
  // Calcul dynamique avec le bon nom de variable
  const totalCandidats = listeCandidatsMock.length;
  const enAttente = listeCandidatsMock.filter(c => c.statut === 'En attente').length;
  const valides = listeCandidatsMock.filter(c => c.statut === 'Validé').length;

  return (
    <div className="min-h-screen bg-base-200 p-6 text-base-content">
      {/* 1. HEADER & TITRE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">BridgeTech Gateway — Espace RH</h1>
        <p className="text-sm opacity-70">Gestion, filtrage et suivi des sessions de recrutement</p>
      </div>

      {/* 2. CARTES DE STATISTIQUES */}
      <div className="stats shadow bg-base-100 w-full mb-8 grid grid-cols-1 md:grid-cols-3">
        <div className="stat">
          <div className="stat-title font-semibold">Total Candidatures</div>
          <div className="stat-value text-primary">{totalCandidats}</div>
          <div className="stat-desc">Dossiers reçus au total</div>
        </div>
        
        <div className="stat">
          <div className="stat-title font-semibold">En attente de revue</div>
          <div className="stat-value text-warning">{enAttente}</div>
          <div className="stat-desc">Nécessitent une action</div>
        </div>
        
        <div className="stat">
          <div className="stat-title font-semibold">Profils Validés</div>
          <div className="stat-value text-success">{valides}</div>
          <div className="stat-desc">Prêts pour l'entretien IT</div>
        </div>
      </div>

      {/* 3. SECTION TABLEAU DES CANDIDATS */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Liste des Candidats</h2>
          
          <div className="form-control w-full md:w-72">
            <input 
              type="text" 
              placeholder="Rechercher un candidat..." 
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* La Table */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full table-zebra">
            <thead>
              <tr className="bg-base-300 text-sm">
                <th>Candidat</th>
                <th>Email</th>
                <th>Score Test</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listeCandidatsMock.map((candidat) => ( // Corrigé ici !
                <tr key={candidat.id} className="hover">
                  <td>
                    <div className="font-bold">{candidat.nom} {candidat.prenom}</div>
                  </td>
                  <td>{candidat.email}</td>
                  <td>
                    <div className="badge badge-ghost font-mono font-semibold">
                      {candidat.score}/100
                    </div>
                  </td>
                  <td>
                    <span className={`badge font-semibold ${
                      candidat.statut === 'Validé' ? 'badge-success' :
                      candidat.statut === 'En attente' ? 'badge-warning' : 'badge-error'
                    }`}>
                      {candidat.statut}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-primary btn-outline mr-2">Voir CV</button>
                    <button className="btn btn-sm btn-success text-white">Décider</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}