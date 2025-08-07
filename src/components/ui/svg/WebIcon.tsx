import * as React from "react";

type WebIconProps = React.SVGProps<SVGSVGElement>;

const WebIcon: React.FC<WebIconProps> = (props) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.1001 8C12.1001 10.7614 9.86152 13 7.1001 13M12.1001 8C12.1001 5.23858 9.86152 3 7.1001 3M12.1001 8H2.1001M7.1001 13C4.33867 13 2.1001 10.7614 2.1001 8M7.1001 13C5.81621 11.6519 5.1001 9.86163 5.1001 8C5.1001 6.13837 5.81621 4.34808 7.1001 3M7.1001 13C8.38398 11.6519 9.1001 9.86163 9.1001 8C9.1001 6.13837 8.38398 4.34808 7.1001 3M2.1001 8C2.1001 5.23858 4.33867 3 7.1001 3"
      stroke="#F4F4F4"
      strokeOpacity={0.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default WebIcon;
