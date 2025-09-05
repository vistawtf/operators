import { VistaIcon } from "@/components/ui/svg";

const OperatorDashboardHeader: React.FC = () => {
  return (
    <div className="text-center">
      <span className="flex justify-center gap-[12px]">
        <p className="font-geist-sans text-[18px] text-[var(--color-light-gray)]">Where opportunities meet operators</p>
        <VistaIcon />
      </span>
    
      <p className="font-semibold font-geist-sans text-[32px] sm:text-[40px] -mt-1">Operator Opportunities</p>
    </div>
  );
};

export default OperatorDashboardHeader;
