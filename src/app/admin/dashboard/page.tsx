import { listProjects } from "@/app/actions";
import AdminDashboard from "@/components/features/AdminDashboard/AdminDashboard";

export default async function AdminDashboardPage() {
  const data = await listProjects();
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Projects</h1>
      <AdminDashboard data={data} />
    </main>
  );
}
