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
  const minRequirement = requirements.find((req: any) => req.tier === "minimum");
  const recRequirement = requirements.find((req: any) => req.tier === "recommended");
  
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
        {hardwareRequirements.map(({ title, specs }) => {
          const [CpuSpec, RamSpec, StorageSpec, BandwidthSpec] = specs;
          return (
          <div key={title} className="flex flex-col gap-[32px]">
            <p className="font-medium text-[32px] font-geist-sans text-white">{title}</p>
            
            <div
              className="h-[158px] px-4 xl:px-[52px] py-[30px] bg-[var(--color-ultra-gray)] rounded-[4px] flex items-center justify-center"
            >
              <div className="inline-flex justify-start items-center gap-8 flex-wrap content-center">
                <div className="w-28 inline-flex flex-col justify-start items-start gap-7">
                  <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <div className="w-[25px] h-[25px] flex-shrink-0">
                      <CpuSpec.Icon stroke="var(--color-light-blue)" />
                    </div>
                    <div className="justify-start leading-none">
                      <p className="font-semibold font-geist-sans text-white">{CpuSpec.value}</p>
                      <p className="font-geist-mono font-semibold text-[var(--color-light-gray)]">
                        {CpuSpec.label}
                      </p>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <div className="w-[25px] h-[25px] flex-shrink-0">
                      <StorageSpec.Icon stroke="var(--color-light-blue)" />
                    </div>
                    <div className="justify-start leading-none">
                      <p className="font-semibold font-geist-sans text-white">{StorageSpec.value}</p>
                      <p className="font-geist-mono font-semibold text-[var(--color-light-gray)]">
                        {StorageSpec.label}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-7">
                  <div className="inline-flex justify-start items-center gap-2.5">
                    <div className="w-[25px] h-[25px] flex-shrink-0">
                      <RamSpec.Icon stroke="var(--color-light-blue)" />
                    </div>
                    <div className="justify-start leading-none">
                      <p className="font-semibold font-geist-sans text-white">{RamSpec.value}</p>
                      <p className="font-geist-mono font-semibold text-[var(--color-light-gray)]">
                        {RamSpec.label}
                      </p>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <div className="w-[25px] h-[25px] flex-shrink-0">
                      <BandwidthSpec.Icon stroke="var(--color-light-blue)" />
                    </div>
                    <div className="justify-start leading-none">
                      <p className="font-semibold font-geist-sans text-white">{BandwidthSpec.value}</p>
                      <p className="font-geist-mono font-semibold text-[var(--color-light-gray)]">
                        {BandwidthSpec.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="w-full xl:w-[50%] flex flex-col gap-[32px]">
        <p className="font-medium font-geist-sans text-[32px] text-white">Entry Requirements</p>

        <div
          className="h-[158px] px-6 xl:px-[75px] py-[30px]
                       bg-[var(--color-ultra-gray)] rounded-[4px] flex items-center justify-center"
        >
          <div className="w-60 inline-flex flex-col justify-start items-start gap-4">
            <div className="inline-flex justify-start items-center gap-4">
              <div className="w-6 h-6 flex-shrink-0">
                {isPermissionless ? (
                  <UnlockIcon stroke="var(--color-medium-lime)" />
                ) : (
                  <LockIcon />
                )}
              </div>
              <div className="justify-start text-white text-xl font-medium font-geist-mono uppercase leading-snug tracking-tight">
                {entryType.toUpperCase()}
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-4">
              <div className="w-60 justify-start text-[var(--color-light-gray)] text-base font-normal font-geist-sans leading-tight tracking-tight">
                {isPermissionless 
                  ? "No specific approval or stake needed to participate"
                  : "Active Operator Set is gated for the top 200 stakeholders"
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorViewRequirements;
