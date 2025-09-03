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
      <p className="font-medium text-[61px]">{protocol.name}</p>

      <p className="text-[20px] text-[var(--color-light-gray)] text-justify">
        {protocol.description}
      </p>

      <OperatorViewRequirements className="my-[40px]" protocol={protocol} />

      <div className="space-y-[32px]">
        <p className="text-[32px] text-white font-medium">Docs & Integration</p>

        <div className="space-y-[16px]">
          <div className="flex items-center gap-[14px]">
            <CodeIcon stroke="var(--color-light-purple)" />
            <p className="text-justify text-[20px] text-[var(--color-light-gray)]">
              Official documentation for operators (running sequencers, full
              nodes, provers) is available
            </p>
          </div>

          <div className="flex items-center gap-[14px]">
            <CodeIcon
              stroke="var(--color-light-purple)"
              className="flex-shrink-0"
            />
            <p className="text-justify text-[20px] text-[var(--color-light-gray)]">
              Integrations/tools include Aztec.js (library to interact with
              contracts) and Aztec.nr (Noir framework for private smart
              contracts). The network uses Noir for zk circuits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorViewContent;
