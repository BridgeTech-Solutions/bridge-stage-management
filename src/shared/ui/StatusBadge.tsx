import type { RequestStatus } from "@prisma/client";
import { STATUS_BADGE, STATUS_LABELS } from "@/shared/constants/domain";

/** Affiche un badge DaisyUI coloré pour un statut de demande. */
export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={`badge ${STATUS_BADGE[status]} badge-sm`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
