import { VistaIcon } from "@/components/ui/svg";

const OperatorDashboardHeader: React.FC = () => {
  return (
    <div className="text-center space-y-[3px]">
      <span className="flex justify-center gap-[5px]">
        <p className="font-inter-sans text-[18px]">powered by vista</p>
        <VistaIcon />
      </span>

      <p className="font-semibold font-geist-sans text-[32px] sm:text-[40px]">Operator Opportunities</p>
    </div>
  );
};

export default OperatorDashboardHeader;
