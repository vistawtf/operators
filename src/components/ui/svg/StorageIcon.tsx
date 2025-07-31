import * as React from "react";

type StorageIconProps = React.SVGProps<SVGSVGElement>;

const StorageIcon: React.FC<StorageIconProps> = (props) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 8.5C17.4706 8.5 21.5 7.15685 21.5 5.5C21.5 3.84315 17.4706 2.5 12.5 2.5C7.52944 2.5 3.5 3.84315 3.5 5.5C3.5 7.15685 7.52944 8.5 12.5 8.5Z"
      stroke="#E4E2D8"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5 12.5C21.5 14.16 17.5 15.5 12.5 15.5C7.5 15.5 3.5 14.16 3.5 12.5"
      stroke="#E4E2D8"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 5.5V19.5C3.5 21.16 7.5 22.5 12.5 22.5C17.5 22.5 21.5 21.16 21.5 19.5V5.5"
      stroke="#E4E2D8"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default StorageIcon;
