import { statusMap, type RequestStatus } from "@/features/demandes-admin/types";

interface StatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

/**
 * Composant pour afficher un badge de statut avec la bonne couleur DaisyUI.
 */
export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const { label, badge } = statusMap[status] || statusMap.PENDING;

  return (
    <span className={`badge font-semibold text-white ${badge} ${className}`}>
      {label}
    </span>
  );
}
