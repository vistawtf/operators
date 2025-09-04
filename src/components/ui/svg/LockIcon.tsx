import * as React from "react";

type LockIconProps = React.SVGProps<SVGSVGElement>;

const LockIcon: React.FC<LockIconProps> = (props) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 11.5557V7.55566C7 6.22958 7.52678 4.95781 8.46447 4.02013C9.40215 3.08245 10.6739 2.55566 12 2.55566C13.3261 2.55566 14.5979 3.08245 15.5355 4.02013C16.4732 4.95781 17 6.22958 17 7.55566V11.5557M5 11.5557H19C20.1046 11.5557 21 12.4511 21 13.5557V20.5557C21 21.6602 20.1046 22.5557 19 22.5557H5C3.89543 22.5557 3 21.6602 3 20.5557V13.5557C3 12.4511 3.89543 11.5557 5 11.5557Z"
      stroke={`${props.stroke ? props.stroke : "#FF6565"}`}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default LockIcon;
