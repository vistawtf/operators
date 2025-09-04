import CrossIcon from "../ui/svg/CrossIcon";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`${className} w-full flex items-center justify-between`}>
      <div>
        <p className="font-semibold font-geist-sans text-[31.35px]">Operator Opportunities</p>
      </div>

      <div
        className="flex h-[40px] gap-[18px] 
                   font-geist-mono 
                   text-[14px] text-[var(--color-vista-black)]"
      >
        <a
          href="https://vista.wtf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[151px] h-full gap-[13px]
                     bg-[var(--color-vista-light)] rounded-[3px]
                     flex justify-center items-center cursor-pointer
                     hover:opacity-90 transition-opacity"
        >
          <p>ABOUT VISTA</p>
          <CrossIcon />
        </a>
        <a
          href="https://github.com/vistawtf/operators"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[210px] h-full gap-[13px]
                     bg-[var(--color-medium-orange)] rounded-[3px]
                     flex justify-center items-center cursor-pointer
                     hover:opacity-90 transition-opacity"
        >
          ADD YOUR PROJECT
          <CrossIcon />
        </a>
      </div>
    </header>
  );
};

export default Header;
