import { OperatorViewHeader, OperatorViewContent } from ".";

const OperatorView: React.FC = () => {
  return (
    <div
      className="flex flex-col px-[176px] py-[80px]
                 border border-[var(--color-medium-gray)] rounded-[8px]"
    >
      <OperatorViewHeader className="mb-[18px]" />

      <OperatorViewContent />
    </div>
  );
};

export default OperatorView;
