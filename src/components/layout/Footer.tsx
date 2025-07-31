import React from "react";
import Image from "next/image";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={`${className} relative left-1/2 right-1/2 -translate-x-1/2 w-screen h-[400px]`}
    >
      <Image
        src="/footer-background.svg"
        alt="Footer Background"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
        quality={100}
      />

      <div
        className="relative z-10 h-full max-w-[1205px] 
                      mx-auto pb-[51px] pt-[180px] 
                      flex justify-between font-geist-mono"
      >
        <div className="flex flex-col gap-[104px]">
          <p>
            <span className="text-[var(--color-light-gray)]">Made with</span>{" "}
            <span className="text-[var(--color-ultra-orange)]">&lt;3</span> by
            vista
          </p>
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <p className="text-[12px]">
              <span className="text-[var(--color-light-gray)]">
                GET IN TOUCH:
              </span>{" "}
              <a href="mailto:INFO@VISTA.WTF" className="hover:text-white">
                INFO@VISTA.WTF
              </a>
            </p>
          </div>
        </div>

        <div className="flex gap-[129px]">
          <div>
            <p className="text-[18px] mb-[8px]">ABOUT</p>
            <div className="font-medium text-[var(--color-light-gray)] text-[16px] space-y-[8px]">
              <a href="/solutions" className="block hover:text-white">
                Solutions
              </a>
              <a href="/work" className="block hover:text-white">
                Work
              </a>
              <a href="/team" className="block hover:text-white">
                Team
              </a>
            </div>
          </div>

          <div>
            <p className="text-[18px] mb-[8px]">SOCIALS</p>
            <div className="font-medium text-[var(--color-light-gray)] text-[16px] space-y-[8px]">
              <a
                href="https://twitter.com/vista"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white"
              >
                X (Twitter)
              </a>
              <a
                href="https://github.com/vista"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white"
              >
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
