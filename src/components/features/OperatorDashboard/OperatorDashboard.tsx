"use client";

import { useState, useEffect } from "react";

import {
  Row,
  OperatorDashboardTable,
  OperatorDashboardFilter,
  OperatorDashboardHeader,
} from ".";
import { fetchProtocols, transformToTableRows } from "@/lib/data";
import { getProtocolIcon } from "@/lib/protocol-icons";

const OperatorDashboard: React.FC = () => {
  const [allData, setAllData] = useState<Row[]>([]);
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const protocols = await fetchProtocols();
        
        // Transform to table format and add proper icons
        const tableData = transformToTableRows(protocols).map(row => ({
          ...row,
          project: {
            ...row.project,
            icon: getProtocolIcon(row.project.protocolId || '')
          }
        }));
        
        setAllData(tableData);
        setFilteredData(tableData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col">
        <OperatorDashboardHeader />
        <div className="mt-[40px] flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-light-orange)] mx-auto mb-4"></div>
            <p className="text-white/60 animate-pulse">Loading protocols...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <OperatorDashboardHeader />
        <div className="mt-[40px] flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-400 mb-2">Failed to load protocols</p>
            <p className="text-white/60 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <OperatorDashboardHeader />

      <OperatorDashboardFilter
        className="mt-[40px] mb-[24px]"
        items={allData}
        onFilter={setFilteredData}
      />

      <OperatorDashboardTable data={filteredData} />
    </div>
  );
};

export default OperatorDashboard;
