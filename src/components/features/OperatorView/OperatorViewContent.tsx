import { CodeIcon } from "@/components/ui/svg";
import { OperatorViewRequirements } from ".";

interface OperatorViewContentProps {
  className?: string;
}

const OperatorViewContent: React.FC<OperatorViewContentProps> = ({
  className,
}) => {
  return (
    <div className={`${className} flex flex-col`}>
      <p className="font-medium text-[61px]">Aztec</p>

      <p className="text-[20px] text-[var(--color-light-gray)] text-justify">
        Aztec is a privacy-first Layer 2 (L2) solution built on Ethereum. Its
        primary purpose is to bring privacy to the otherwise publicly visible
        transactions on the Ethereum blockchain. Aztec achieves this by
        operating as a new alternative virtual machine (alt-VM), diverging from
        EVM compatibility to extend the Ethereum ecosystem.
      </p>

      <OperatorViewRequirements className="my-[40px]" />

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
