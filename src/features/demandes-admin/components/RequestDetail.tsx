"use client";

import { useState } from "react";
import { updateRequestStatus } from "@/features/demandes-admin/actions";
import StatusBadge from "@/features/demandes-admin/components/StatusBadge";
import {
  statusMap,
  internshipTypeMap,
  type InternshipRequestSerialized,
  type RequestStatus,
} from "@/features/demandes-admin/types";

interface RequestDetailProps {
  request: InternshipRequestSerialized;
  onClose?: () => void;
}

/**
 * Modal de détail d'une demande avec possibilité de changer le statut.
 */
export default function RequestDetail({ request, onClose }: RequestDetailProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus>(
    request.status as RequestStatus
  );
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleStatusChange = async (newStatus: RequestStatus) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await updateRequestStatus(request.id, newStatus);

      if (result.success) {
        setSelectedStatus(newStatus);
        setMessage({
          type: "success",
          text: result.message || "Statut mis à jour avec succès",
        });

        // Fermer le modal après 2 secondes
        setTimeout(() => {
          onClose?.();
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Erreur lors de la mise à jour",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Une erreur inattendue est survenue",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        {/* En-tête */}
        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div>
            <h3 className="card-title text-primary text-2xl">
              {request.profile?.firstName} {request.profile?.lastName}
            </h3>
            <p className="text-sm text-base-content/60">
              Code suivi: <span className="font-mono font-semibold">{request.trackingCode}</span>
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Fermer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Type de stage</span>
            </label>
            <p className="text-sm">
              {internshipTypeMap[request.type] || request.type}
            </p>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Statut actuel</span>
            </label>
            <StatusBadge status={selectedStatus} />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Durée souhaitée</span>
            </label>
            <p className="text-sm">{request.duration || "Non spécifiée"}</p>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Date dépôt</span>
            </label>
            <p className="text-sm">{request.createdAt ? new Date(request.createdAt).toLocaleDateString("fr-FR") : "—"}</p>
          </div>
        </div>

        {/* Profil du candidat */}
        <div className="divider my-4">Informations du candidat</div>
        <div className="grid grid-cols-1 gap-2 mb-6 text-sm">
          <p>
            <span className="font-semibold">Email:</span> {request.profile?.email}
          </p>
          <p>
            <span className="font-semibold">Téléphone:</span> {request.profile?.phone}
          </p>
          <p>
            <span className="font-semibold">École:</span> {request.profile?.school}
          </p>
          <p>
            <span className="font-semibold">Filière:</span> {request.profile?.field}
          </p>
          <p>
            <span className="font-semibold">Niveau:</span> {request.profile?.level}
          </p>
        </div>

        {/* Documents */}
        {request.documents.length > 0 && (
          <>
            <div className="divider my-4">Documents</div>
            <div className="space-y-2 mb-6">
              {request.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between bg-base-200 p-3 rounded">
                  <span className="text-sm">{doc.label}</span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-xs"
                  >
                    Voir
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Changement de statut */}
        <div className="divider my-4">Gestion du statut</div>
        <div className="space-y-3 mb-6">
          {(Object.keys(statusMap) as RequestStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              disabled={isLoading || status === selectedStatus}
              className={`btn btn-block justify-start ${
                status === selectedStatus ? "btn-active btn-primary" : "btn-outline"
              }`}
            >
              <StatusBadge status={status} className="mr-2" />
              {statusMap[status].label}
            </button>
          ))}
        </div>

        {/* Messages de feedback */}
        {message && (
          <div
            className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}
          >
            <p>{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
