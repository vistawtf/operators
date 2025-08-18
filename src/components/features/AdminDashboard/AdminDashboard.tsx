"use client";

import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import AdminDashboardExpandRow from "./AdminDashboardExpandRow";

type Data = {
  id: string;
  name: string;
  website: string | null;
  isActive: boolean;
  createdAt: string; // ISO
};

export interface AdminDashboardProps {
  data: Data[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data }) => {
  const columns = useMemo<ColumnDef<Data>[]>(
    () => [
      {
        id: "expander",
        header: "",
        cell: ({ row }) => (
          <button
            onClick={row.getToggleExpandedHandler()}
            aria-label={row.getIsExpanded() ? "Collapse" : "Expand"}
            aria-expanded={row.getIsExpanded()}
            className={[
              "inline-flex h-7 w-7 items-center justify-center",
              "rounded-lg border border-white/15 bg-white/10",
              "hover:bg-white/15 active:bg-white/20",
              "focus:outline-none focus:ring-2 focus:ring-white/20",
              "transition",
            ].join(" ")}
          >
            {row.getIsExpanded() ? "–" : "+"}
          </button>
        ),
        size: 48,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => (
          <span className="font-medium">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "website",
        header: "Website",
        cell: (info) => {
          const w = info.getValue<string | null>();
          return w ? (
            <a
              href={w}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 decoration-white/30 hover:decoration-white transition"
            >
              {w}
            </a>
          ) : (
            <span className="opacity-60">—</span>
          );
        },
      },
      {
        accessorKey: "isActive",
        header: "Active",
        size: 100,
        cell: (info) => (
          <span
            className={[
              "inline-flex items-center rounded-full",
              "border border-white/15 bg-white/10",
              "px-2 py-0.5 text-xs",
            ].join(" ")}
          >
            {info.getValue<boolean>() ? "Yes" : "No"}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 shadow-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-white/5">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left text-xs font-semibold uppercase tracking-wide p-3 border-b border-white/10"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr className="hover:bg-white/5 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 border-b border-white/10 align-top"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>

              {row.getIsExpanded() && (
                <tr>
                  <td
                    colSpan={row.getVisibleCells().length}
                    className="p-0 border-b border-white/10"
                  >
                    <div className="bg-white/[0.04]">
                      <AdminDashboardExpandRow projectId={row.original.id} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
