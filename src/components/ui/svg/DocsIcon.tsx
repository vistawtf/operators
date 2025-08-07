import * as React from "react";

type DocsIconProps = React.SVGProps<SVGSVGElement>;

const DocsIcon: React.FC<DocsIconProps> = (props) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.5 11.75V4.25C3.5 3.91848 3.6317 3.60054 3.86612 3.36612C4.10054 3.1317 4.41848 3 4.75 3H11C11.1326 3 11.2598 3.05268 11.3536 3.14645C11.4473 3.24021 11.5 3.36739 11.5 3.5V12.5C11.5 12.6326 11.4473 12.7598 11.3536 12.8536C11.2598 12.9473 11.1326 13 11 13H4.75C4.41848 13 4.10054 12.8683 3.86612 12.6339C3.6317 12.3995 3.5 12.0815 3.5 11.75ZM3.5 11.75C3.5 11.4185 3.6317 11.1005 3.86612 10.8661C4.10054 10.6317 4.41848 10.5 4.75 10.5H11.5M5.5 7.5H9.5M5.5 5.5H8.5"
      stroke="#F4F4F4"
      strokeOpacity={0.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DocsIcon;
