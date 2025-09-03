"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "@/components/features/AdminDashboard/AdminDashboard";
import { fetchProtocols, getProtocolsForAdmin } from "@/lib/data";

interface AdminProject {
  id: string;
  name: string;
  website: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const protocols = await fetchProtocols();
        const adminData = getProtocolsForAdmin(protocols);
        setProjects(adminData);
      } catch (error) {
        console.error('Failed to load protocols:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/60">Loading admin dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-white/60">
          This data is read-only and comes from the protocols.json file.
          To make changes, update the JSON file directly.
        </p>
      </div>
      <AdminDashboard data={projects} />
    </main>
  );
}
