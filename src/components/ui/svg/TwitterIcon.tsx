import * as React from "react";

type TwitterIconProps = React.SVGProps<SVGSVGElement>;

const TwitterIcon: React.FC<TwitterIconProps> = (props) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.9605 4H11.3741L8.28573 7.53009L11.9191 12.3328H9.07433L6.84642 9.41959L4.29661 12.3328H2.88227L6.18573 8.55685L2.7002 4.00038H5.61722L7.63118 6.66312L9.9605 4ZM9.4646 11.4869H10.2478L5.19162 4.80166H4.35116L9.4646 11.4869Z"
      fill="#F4F4F4"
      fillOpacity={0.75}
    />
  </svg>
);

export default TwitterIcon;
