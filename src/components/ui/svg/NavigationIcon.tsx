import * as React from "react";

type NavigationIconProps = React.SVGProps<SVGSVGElement>;

const NavigationIcon: React.FC<NavigationIconProps> = (props) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.5 19V5M13.5 6L7.5 12M7.5 12L13.5 18M7.5 12H21.5"
      stroke="#999999"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default NavigationIcon;
