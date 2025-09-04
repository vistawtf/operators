import type { FC } from 'react';
import { Plasma } from './noise';

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => (
  <footer className={className}>
    <Plasma>
      <div className="z-[100] relative max-w-screen-xl mx-auto px-4 pt-[400px] h-full pb-16">
        <div className="flex w-full h-full md:flex-row flex-col-reverse gap-12 md:gap-0">
          <div className="flex flex-col items-center md:items-start md:justify-between h-full w-full">
            <p className="text-vista-gray-light text-[25px] text-shadow-lg text-shadow-black">
              made with <span className="text-vista-orange">{'<3'}</span> by{' '}
              <span className="text-vista-light">vista</span>
            </p>
            <p className="text-vista-gray-light text-sm font-mono text-shadow-lg text-shadow-black">
              GET IN TOUCH: <span className="text-vista-light">INFO@VISTA.WTF</span>
            </p>
          </div>
          <div className="flex justify-center md:justify-end w-full gap-24">
            <div>
              <h4 className="text-[21px] text-vista-light mb-4">Navigation</h4>
              <div className="flex flex-col gap-4 font-mono text-vista-gray-light text-sm">
                <a href="https://vista.wtf" className="hover:text-vista-orange-light duration-300">
                  HOME
                </a>
                <a href="https://vista.wtf" className="hover:text-vista-orange-light duration-300">
                  ABOUT
                </a>
                <a href="https://vista.wtf" className="hover:text-vista-orange-light duration-300">
                  SOLUTIONS
                </a>
                <a href="https://vista.wtf" className="hover:text-vista-orange-light duration-300">
                  WORK
                </a>
                <a href="https://vista.wtf" className="hover:text-vista-orange-light duration-300">
                  TEAM
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-[21px] text-vista-light mb-4">Socials</h4>
              <div className="flex flex-col gap-4 font-mono text-vista-gray-light text-sm">
                <a
                  href="https://x.com/vistawtf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-vista-orange-light duration-300"
                >
                  X (TWITTER)
                </a>
                <a
                  href="https://github.com/vistawtf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-vista-orange-light duration-300"
                >
                  GITHUB
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
