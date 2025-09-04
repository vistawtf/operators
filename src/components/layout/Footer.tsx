import type { FC } from 'react';
import { Plasma } from './noise';

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => (
  <footer className={`${className} w-full`}>
    <Plasma>
      <div className="z-[100] relative max-w-screen-xl mx-auto px-4 pt-[120px] h-full pb-16">
        <div className="flex w-full h-full md:flex-row flex-col-reverse gap-12 md:gap-0">
          <div className="flex flex-col items-center md:items-start md:justify-between h-full w-full">
            <p className="text-vista-gray-light text-[25px] text-shadow-lg text-shadow-black font-geist-sans">
              made with <span className="text-vista-orange">{'<3'}</span> by{' '}
              <span className="text-vista-light">vista</span>
            </p>
            <p className="text-vista-gray-light text-sm font-geist-mono text-shadow-lg text-shadow-black">
              GET IN TOUCH: <a href="mailto:info@vista.wtf" className="text-[var(--color-vista-light)] hover:text-[var(--color-light-orange)] transition-colors duration-300 cursor-pointer">INFO@VISTA.WTF</a>
            </p>
          </div>
          <div className="flex justify-center md:justify-end w-full">
            <div>
              <h4 className="text-[21px] text-vista-light mb-4 font-geist-sans">Socials</h4>
              <div className="flex flex-col gap-4 font-geist-mono text-vista-gray-light text-sm">
                <a
                  href="https://x.com/vistawtf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-light-orange)] transition-colors duration-300"
                >
                  X (TWITTER)
                </a>
                <a
                  href="https://github.com/vistawtf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-light-orange)] transition-colors duration-300"
                >
                  GITHUB
                </a>
                <a
                  href="https://paragraph.com/@vista/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-light-orange)] transition-colors duration-300"
                >
                  PARAGRAPH.XYZ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Plasma>
  </footer>
);

export default Footer;
