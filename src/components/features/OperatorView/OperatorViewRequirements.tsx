import {
  CpuIcon,
  RamIcon,
  StorageIcon,
  UnlockIcon,
  WifiIcon,
} from "@/components/ui/svg";

interface OperatorViewRequirementsProps {
  className?: string;
}

const OperatorViewRequirements: React.FC<OperatorViewRequirementsProps> = ({
  className,
}) => {
  const specs = [
    { Icon: CpuIcon, value: "8 cores", label: "CPU" },
    { Icon: RamIcon, value: "16GB", label: "RAM" },
    { Icon: StorageIcon, value: "2TB", label: "STORAGE" },
    { Icon: WifiIcon, value: "100 Mbps", label: "BANDWIDTH" },
  ];

  return (
    <div className={`${className} flex gap-[32px]`}>
      <div className="w-[55%] flex flex-col gap-[32px]">
        <p className="font-medium text-[32px] text-white">Minimum Hardware</p>

        <div
          className="h-[158px] grid grid-cols-2 grid-rows-2 gap-x-[32px] gap-y-[29px] px-[52px] py-[30px] 
                       bg-[var(--color-ultra-gray)] rounded-[4px]"
        >
          {specs.map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-[10px] h-full">
              <Icon stroke="var(--color-light-blue)" />

              <div className="leading-none">
                <p className="font-semibold">{value}</p>
                <p className="font-geist-mono font-semibold text-[var(--color-light-gray)]">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[45%] flex flex-col gap-[32px]">
        <p className="font-medium text-[32px] text-white">Entry Requirements</p>

        <div
          className="h-[158px] flex flex-col gap-[16px] px-[75px] py-[30px]
                       bg-[var(--color-ultra-gray)] rounded-[4px]"
        >
          <div className="flex items-center gap-[16px]">
            <UnlockIcon stroke="var(--color-medium-lime)" />
            <p className="font-geist-mono font-medium text-[20px] text-white">
              PERMISIONLESS
            </p>
          </div>

          <p className="font-[var(--color-light-gray)] text-justify">
            No specific stake or approval needed to participate
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperatorViewRequirements;
