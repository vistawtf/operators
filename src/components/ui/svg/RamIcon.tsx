import * as React from "react";

type RamIconProps = React.SVGProps<SVGSVGElement>;

const RamIcon: React.FC<RamIconProps> = (props) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 12.5H2.5"
      stroke="#E4E2D8"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.95 5.61L2.5 12.5V18.5C2.5 19.0304 2.71071 19.5391 3.08579 19.9142C3.46086 20.2893 3.96957 20.5 4.5 20.5H20.5C21.0304 20.5 21.5391 20.2893 21.9142 19.9142C22.2893 19.5391 22.5 19.0304 22.5 18.5V12.5L19.05 5.61C18.8844 5.27679 18.6292 4.99637 18.313 4.80028C17.9967 4.60419 17.6321 4.5002 17.26 4.5H7.74C7.36792 4.5002 7.00326 4.60419 6.68704 4.80028C6.37083 4.99637 6.11558 5.27679 5.95 5.61Z"
      stroke="#E4E2D8"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 16.5H6.51"
      stroke="#E4E2D8"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 16.5H10.51"
      stroke="#E4E2D8"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default RamIcon;
