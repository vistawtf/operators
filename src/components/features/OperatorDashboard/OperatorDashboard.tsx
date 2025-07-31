"use client";

import { useState } from "react";
import OperatorDashboardFilter from "./OperatorDashboardFilter";
import OperatorDashboardHeader from "./OperatorDashboardHeader";
import OperatorDashboardTable, { Row } from "./OperatorDashboardTable";
import AztecIcon from "@/components/ui/svg/protocols/AztecIcon";
import LidoIcon from "@/components/ui/svg/protocols/LidoIcon";
import EigenDAIcon from "@/components/ui/svg/protocols/EigenDAIcon";
import BuildernetIcon from "@/components/ui/svg/protocols/BuildernetIcon";

export const dummyData: Row[] = [
  {
    id: "1",
    project: { icon: <AztecIcon />, name: "Aztec", url: "aztec.network" },
    category: ["L2"],
    status: "Testnet",
    entry: { type: "Permissionless", condition: "NO STAKE" },
    hardware: {
      cpu: "4 cores",
      ram: "8GB",
      storage: "2TB",
      bandwith: "100Mbps",
    },
  },
  {
    id: "2",
    project: { icon: <LidoIcon />, name: "Lido", url: "lido.fi" },
    category: ["LST"],
    status: "Mainnet",
    entry: { type: "Permissionless", condition: "1.3 ETH" },
    hardware: {
      cpu: "8 cores",
      ram: "16GB",
      storage: "2TB",
      bandwith: "100Mbps",
    },
  },
  {
    id: "3",
    project: { icon: <EigenDAIcon />, name: "EigenDA", url: "eigenda.xyz" },
    category: ["DA", "AVS"],
    status: "Mainnet",
    entry: { type: "Permissioned", condition: "TOP 200 STAKE" },
    hardware: {
      cpu: "8 cores",
      ram: "16GB",
      storage: "2TB",
      bandwith: "100Mbps",
    },
  },
  {
    id: "4",
    project: {
      icon: <BuildernetIcon />,
      name: "Buildernet",
      url: "buildernet.org",
    },
    category: ["L2", "MEV"],
    status: "Mainnet",
    entry: { type: "Permissionless", condition: "NO STAKE" },
    hardware: {
      cpu: "2 cores",
      ram: "4GB",
      storage: "2TB",
      bandwith: "100Mbps",
    },
  },
];

const OperatorDashboard: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Row[]>(dummyData);

  return (
    <div className="flex flex-col">
      <OperatorDashboardHeader />

      <OperatorDashboardFilter
        className="mt-[40px] mb-[24px]"
        items={dummyData}
        onFilter={setFilteredData}
      />

      <OperatorDashboardTable className="mb-[106px]" data={filteredData} />
    </div>
  );
};

export default OperatorDashboard;
