import * as React from "react";

type CodeIconProps = React.SVGProps<SVGSVGElement>;

const CodeIcon: React.FC<CodeIconProps> = (props) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 18.5557L22.5 12.5557L16.5 6.55566M8.5 6.55566L2.5 12.5557L8.5 18.5557"
      stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CodeIcon;
