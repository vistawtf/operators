import * as React from "react";

type CrossIconProps = React.SVGProps<SVGSVGElement>;

const CrossIcon: React.FC<CrossIconProps> = (props) => (
  <svg
    width={13}
    height={12}
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line
      x1={0.714111}
      y1={5.99655}
      x2={12.3266}
      y2={5.99655}
      stroke="#111111"
      strokeWidth={2.55475}
    />
    <line
      x1={6.63651}
      y1={0.306152}
      x2={6.63651}
      y2={11.9187}
      stroke="#111111"
      strokeWidth={2.55475}
    />
  </svg>
);
export default CrossIcon;
