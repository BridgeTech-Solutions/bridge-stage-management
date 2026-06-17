import { getInternshipRequests } from "@/features/demandes-admin/queries";
import RequestList from "@/features/demandes-admin/components/RequestList";

/**
 * Wrapper Server : fetche les données et les passe au composant Client.
 */
export default async function ServerRequestList() {
  const requests = await getInternshipRequests();

  return <RequestList requests={requests} />;
}
