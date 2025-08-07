import * as React from "react";

type CpuIconProps = React.SVGProps<SVGSVGElement>;

const CpuIcon: React.FC<CpuIconProps> = (props) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1405_2205)">
      <path
        d="M18.5 4.5H6.5C5.39543 4.5 4.5 5.39543 4.5 6.5V18.5C4.5 19.6046 5.39543 20.5 6.5 20.5H18.5C19.6046 20.5 20.5 19.6046 20.5 18.5V6.5C20.5 5.39543 19.6046 4.5 18.5 4.5Z"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9.5H9.5V15.5H15.5V9.5Z"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 1.5V4.5"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 1.5V4.5"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20.5V23.5"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 20.5V23.5"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 9.5H23.5"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 14.5H23.5"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 9.5H4.5"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 14.5H4.5"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1405_2205">
        <rect
          width={24}
          height={24}
          fill="white"
          transform="translate(0.5 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default CpuIcon;
