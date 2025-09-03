import Link from "next/link";

import {
  WebIcon,
  DocsIcon,
  NavigationIcon,
} from "@/components/ui/svg";
import { Protocol } from "@/lib/data";

interface OperatorViewHeaderProps {
  className?: string;
  protocol: Protocol;
}

const OperatorViewHeader: React.FC<OperatorViewHeaderProps> = ({
  className,
  protocol,
}) => {
  // Get the first opportunity's status for display
  const status = protocol.opportunities[0]?.status || "testnet";
  const primaryTag = protocol.tags[0] || "Protocol";
  
  const links = {
    website: {
      icon: <WebIcon />,
      url: protocol.website,
    },
    docs: {
      icon: <DocsIcon />,
      url: protocol.documentation,
    },
  };

  const bgColor =
    status.toLowerCase() === "mainnet"
      ? "bg-[var(--color-light-blue)]"
      : "bg-[var(--color-light-yellow)]";

  return (
    <div className={`${className} flex flex-col gap-[48px]`}>
      <Link
        href="/"
        className="flex gap-[6px] items-center
                   font-bold text-[16px] font-geist-mono text-[var(--color-light-gray)]"
      >
        <NavigationIcon /> GO BACK TO PROJECT LIST
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <div
            className={`${bgColor} px-[13px] py-[5px] rounded-[8px] text-center`}
          >
            <p className="font-geist-mono font-medium text-[var(--color-medium-gray)] text-[16px]">
              {status.toUpperCase()}
            </p>
          </div>

          <div
            className="px-[10px] py-[5.5px]
                       border border-[var(--color-light-gray) rounded-[5px]"
          >
            <p className="font-geist-mono text-[14px]">{primaryTag}</p>
          </div>
        </div>

        <div className="flex items-center gap-[12px]">
          {Object.entries(links).map(([name, { icon, url }]) => (
            <div
              key={name}
              className="flex items-center px-[14px] py-[7px] gap-[7px] 
                         border border-[var(--color-light-gray)] rounded-[3px] 
                         font-medium text-[16px] font-geist-mono text-[var(--color-light-gray)]"
            >
              {icon}
              <a href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noopener noreferrer">
                {name.toUpperCase()}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperatorViewHeader;
