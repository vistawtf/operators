import CrossIcon from "../ui/svg/CrossIcon";
import { VistaIcon } from "../ui/svg";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`${className} w-full flex items-center justify-between`}>
      <div className="flex items-center gap-2">
        <a href="https://vista.wtf" target="_blank" rel="noopener noreferrer">
          <VistaIcon width={33} height={40} className="cursor-pointer hover:opacity-80 transition-opacity" />
        </a>
      </div>

      <div
        className="flex h-[40px] gap-[12px] md:gap-[18px]
                   font-geist-mono 
                   text-[14px] text-[var(--color-vista-black)]"
      >
        <a
          href="https://github.com/vistawtf/operators"
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-[140px] w-[210px] h-full gap-[8px] md:gap-[13px]
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
