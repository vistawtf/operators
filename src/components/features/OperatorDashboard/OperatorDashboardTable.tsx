"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  CellContext,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { CpuIcon, RamIcon, WifiIcon, StorageIcon } from "@/components/ui/svg";

export interface Row {
  id: string;
  project: {
    icon: React.ReactNode;
    name: string;
    url: string;
    protocolId?: string;
  };
  category: string[];
  status: string;
  entry: {
    type: string;
    condition: string;
  };
  hardware: {
    cpu: string;
    ram: string;
    storage: string;
    bandwith: string;
  };
}

interface OperatorDashboardTableProps {
  className?: string;
  data: Row[];
  initialPageSize?: number;
}

const OperatorDashboardTable: React.FC<OperatorDashboardTableProps> = ({
  className,
  data,
  initialPageSize = 10,
}) => {
  const router = useRouter();

  const ProjectCell = (cellInfo: CellContext<Row, unknown>) => {
    const project = cellInfo.getValue() as Row["project"];

    return (
      <div className="flex items-center gap-[10px]">
        {project.icon}
        <Link 
          href={`/${project.protocolId || project.name.toLowerCase()}`}
          className="hover:opacity-80 transition-opacity"
        >
          <p className="font-geist-sans font-medium text-[16px] cursor-pointer">
            {project.name}
          </p>
          <p className="font-geist-mono font-medium text-[var(--color-light-gray)] text-[12px]">
            {project.url}
          </p>
        </Link>
      </div>
    );
  };

  const CategoryCell = (cellInfo: CellContext<Row, unknown>) => {
    const category = cellInfo.getValue() as Row["category"];

    return (
      <div className="flex flex-wrap gap-[5px]">
        {category.map((tag, idx) => (
          <span
            key={idx}
            className="bg-[var(--color-medium-gray)] font-geist-mono rounded-[4px] px-[8px] py-[4px] text-[14px]"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const StatusCell = (cellInfo: CellContext<Row, unknown>) => {
    const status = cellInfo.getValue() as Row["status"];
    const bgColor =
      status.toLowerCase() === "mainnet"
        ? "bg-[var(--color-light-blue)]"
        : "bg-[var(--color-light-yellow)]";

    return (
      <div className={`${bgColor} p-[4px] rounded-[8px] text-center`}>
        <p className="font-geist-mono font-medium text-[var(--color-vista-black)] text-[12px]">
          {status.toUpperCase()}
        </p>
      </div>
    );
  };

  const EntryCell = (cellInfo: CellContext<Row, unknown>) => {
    const entry = cellInfo.getValue() as Row["entry"];

    return (
      <div className="text-[13px]">
        <p className="font-geist-sans font-semibold">{entry.type}</p>
        <p className="font-geist-mono font-semibold text-[var(--color-light-gray)]">
          {entry.condition.toUpperCase()}
        </p>
      </div>
    );
  };

  const HardwareCell = (cellInfo: CellContext<Row, unknown>) => {
    const hw = cellInfo.getValue() as Row["hardware"];
    const specs = [
      { icon: <CpuIcon />, value: hw.cpu, label: "CPU" },
      { icon: <RamIcon />, value: hw.ram, label: "RAM" },
      { icon: <StorageIcon />, value: hw.storage, label: "Storage" },
      { icon: <WifiIcon />, value: hw.bandwith, label: "Bandwidth" },
    ];
    return (
      <div className="flex gap-[24px] leading-[110%] tracking-[1%]">
        {specs.map((spec, idx) => (
          <div key={idx} className="flex items-center gap-[10px]">
            {spec.icon}
            <div>
              <p className="font-geist-sans font-medium text-sm">
                {spec.value}
              </p>
              <p className="font-geist-mono text-[var(--color-light-gray)] text-xs uppercase">
                {spec.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      {
        accessorFn: (row) => row.project,
        id: "project_name",
        header: "Project",
        cell: (info) => <ProjectCell {...info} />,
      },
      {
        accessorFn: (row) => row.category,
        id: "category",
        header: "Category",
        cell: (info) => <CategoryCell {...info} />,
      },
      {
        accessorFn: (row) => row.status,
        id: "status",
        header: "Status",
        cell: (info) => <StatusCell {...info} />,
      },
      {
        accessorFn: (row) => row.entry,
        id: "entry",
        header: "Entry",
        cell: (info) => <EntryCell {...info} />,
      },
      {
        accessorFn: (row) => row.hardware,
        id: "hardware",
        header: "Hardware",
        cell: (info) => <HardwareCell {...info} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: initialPageSize } },
  });

  return (
    <div
      className={`${className} min-h-[422px] w-full overflow-auto rounded-[8px] border border-[var(--color-idle-gray)]`}
    >
      <table className="min-w-full">
        <thead className="bg-[var(--color-idle-gray)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-[20px] py-[18px] text-left text-[14px] font-geist-mono font-semibold uppercase"
                >
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="bg-[var(--color-ultra-gray)] divide-y divide-[var(--color-idle-gray)]">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="cursor-pointer"
              onClick={() => router.push(row.original.project.url)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-[20px] py-[24] font-geist-mono whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperatorDashboardTable;
