import * as React from "react";

type WifiIconProps = React.SVGProps<SVGSVGElement>;

const WifiIcon: React.FC<WifiIconProps> = (props) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1405_2231)">
      <path
        d="M5.5 13.0501C7.47656 11.4037 9.96761 10.5022 12.54 10.5022C15.1124 10.5022 17.6034 11.4037 19.58 13.0501"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.91992 9.50004C4.84234 6.924 8.60422 5.50269 12.4999 5.50269C16.3956 5.50269 20.1575 6.924 23.0799 9.50004"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.03003 16.61C10.0452 15.8887 11.2597 15.5012 12.505 15.5012C13.7504 15.5012 14.9648 15.8887 15.98 16.61"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 20.5H12.51"
        stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1405_2231">
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
export default WifiIcon;
