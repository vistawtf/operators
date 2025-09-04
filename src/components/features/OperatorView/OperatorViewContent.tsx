import { CodeIcon } from "@/components/ui/svg";
import { OperatorViewRequirements } from ".";
import { Protocol } from "@/lib/data";

interface OperatorViewContentProps {
  className?: string;
  protocol: Protocol;
}

const OperatorViewContent: React.FC<OperatorViewContentProps> = ({
  className,
  protocol,
}) => {
  return (
    <div className={`${className} flex flex-col`}>
      <p className="font-medium font-geist-sans text-[61px]">{protocol.name}</p>

      <p className="text-[20px] font-geist-sans text-[var(--color-light-gray)]">
        {protocol.description}
      </p>

      <OperatorViewRequirements className="my-[40px]" protocol={protocol} />

      <div className="space-y-[32px]">
        <p className="text-[32px] text-white font-geist-sans font-medium">Docs & Integration</p>

        <div className="space-y-[16px]">
          {protocol.docsIntegration?.map((item, index) => (
            <div key={index} className="flex items-start gap-[14px]">
              <CodeIcon
                stroke="var(--color-light-purple)"
                className="flex-shrink-0 mt-1"
              />
              <p className="text-[20px] font-geist-sans text-[var(--color-light-gray)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperatorViewContent;
