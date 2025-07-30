import CrossIcon from "../ui/svg/CrossIcon";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`${className} w-full flex items-center justify-between border border-green-200`}
    >
      <div>
        <p className="font-semibold text-[31.35px]">Operator Opportunities</p>
      </div>

      <div
        className="flex h-[40px] gap-[18px] 
                   font-geist-mono font-bold 
                   text-[14px] text-[var(--color-vista-black)]"
      >
        <button
          className="w-[151px] h-full gap-[13px]
                     bg-[var(--color-vista-light)] rounded-[3px]
                     flex justify-center items-center"
        >
          <p>ABOUT VISTA</p>
          <CrossIcon />
        </button>
        <button
          className="w-[210px] h-full gap-[13px]
                     bg-[var(--color-medium-orange)] rounded-[3px]
                     flex justify-center items-center"
        >
          FILL YOUR PROJECT
          <CrossIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
