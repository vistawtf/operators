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
            <a 
              key={name}
              href={url.startsWith('http') ? url : `https://${url}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center px-[10px] py-[7px] md:px-[14px] md:gap-[7px]
                         border border-[var(--color-light-gray)] rounded-[3px] 
                         font-medium text-[16px] font-geist-mono text-[var(--color-light-gray)]
                         hover:bg-[var(--color-vista-light)] hover:text-[var(--color-vista-black)]
                         hover:border-[var(--color-vista-light)] transition-all duration-300
                         cursor-pointer"
            >
              <div className="group-hover:[&>svg>path]:stroke-[var(--color-vista-black)] transition-colors duration-300">
                {icon}
              </div>
              <span className="hidden md:inline">{name.toUpperCase()}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperatorViewHeader;
