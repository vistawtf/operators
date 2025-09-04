import {
  CpuIcon,
  LockIcon,
  RamIcon,
  StorageIcon,
  UnlockIcon,
  WifiIcon,
} from "@/components/ui/svg";
import { Protocol } from "@/lib/data";

interface OperatorViewRequirementsProps {
  className?: string;
  protocol: Protocol;
}

const OperatorViewRequirements: React.FC<OperatorViewRequirementsProps> = ({
  className,
  protocol,
}) => {
  // Get both minimum and recommended requirements from the first opportunity
  const requirements = protocol.opportunities[0]?.requirements || [];
  const minRequirement = requirements.find(req => req.tier === "minimum");
  const recRequirement = requirements.find(req => req.tier === "recommended");
  
  // Helper function to generate specs for any hardware
  const generateSpecs = (hardware: any) => [
    { Icon: CpuIcon, value: `${hardware?.cpuCores || 4} cores`, label: "CPU" },
    { Icon: RamIcon, value: `${hardware?.ramGb || 8}GB`, label: "RAM" },
    { Icon: StorageIcon, value: `${Math.round((hardware?.storageGb || 1000) / 1000)}TB`, label: "STORAGE" },
    { Icon: WifiIcon, value: `${hardware?.upMbps || 100} Mbps`, label: "BANDWIDTH" },
  ];

  // Determine which requirements to show
  const hardwareRequirements = [];
  if (minRequirement) {
    hardwareRequirements.push({
      title: "Minimum Hardware",
      specs: generateSpecs(minRequirement.hardware),
      requirement: minRequirement
    });
  }
  if (recRequirement) {
    hardwareRequirements.push({
      title: "Recommended Hardware", 
      specs: generateSpecs(recRequirement.hardware),
      requirement: recRequirement
    });
  }

  // Use first available requirement for entry type
  const firstRequirement = minRequirement || recRequirement || requirements[0];
  const entryType = firstRequirement?.entry || "permissionless";
  const isPermissionless = entryType === "permissionless";

  return (
    <div className={`${className} flex flex-col xl:flex-row gap-[32px]`}>
      <div className="w-full xl:w-[50%] flex flex-col gap-[32px]">
        {hardwareRequirements.map(({ title, specs }) => (
          <div key={title} className="flex flex-col gap-[32px]">
            <p className="font-medium text-[32px] font-geist-sans text-white">{title}</p>
            
            <div
              className="h-[158px] grid grid-cols-2 grid-rows-2 gap-x-[16px] xl:gap-x-[32px] gap-y-[29px] px-4 xl:px-[52px] py-[30px]
                         bg-[var(--color-ultra-gray)] rounded-[4px]"
            >
              {specs.map(({ Icon, value, label }) => (
                <div key={label} className="w-28 inline-flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <Icon stroke="var(--color-light-blue)" />
                    <div className="justify-start leading-none">
                      <p className="font-semibold font-geist-sans text-white">{value}</p>
                      <p className="font-geist-mono font-semibold text-[var(--color-light-gray)]">
                        {label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full xl:w-[50%] flex flex-col gap-[32px]">
        <p className="font-medium font-geist-sans text-[32px] text-white">Entry Requirements</p>

        <div
          className="h-[158px] flex flex-col gap-[16px] px-6 xl:px-[75px] py-[30px]
                       bg-[var(--color-ultra-gray)] rounded-[4px]"
        >
          <div className="flex items-center gap-[16px]">
            {isPermissionless ? (
              <UnlockIcon stroke="var(--color-medium-lime)" />
            ) : (
              <LockIcon />
            )}
            <p className="font-geist-mono font-medium text-[20px] text-white">
              {entryType.toUpperCase()}
            </p>
          </div>

          <p className="font-geist-sans text-[var(--color-light-gray)] text-justify">
            {isPermissionless 
              ? "No specific approval or stake needed to participate"
              : "Requires permission or specific criteria to participate"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperatorViewRequirements;
