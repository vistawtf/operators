import * as React from "react";

type UnlockIconProps = React.SVGProps<SVGSVGElement>;

const UnlockIcon: React.FC<UnlockIconProps> = (props) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 11.5556V7.55557C6.99875 6.31562 7.45828 5.11944 8.28937 4.19924C9.12047 3.27904 10.2638 2.70048 11.4975 2.57586C12.7312 2.45125 13.9671 2.78948 14.9655 3.52489C15.9638 4.2603 16.6533 5.34042 16.9 6.55557M5 11.5556H19C20.1046 11.5556 21 12.451 21 13.5556V20.5556C21 21.6601 20.1046 22.5556 19 22.5556H5C3.89543 22.5556 3 21.6601 3 20.5556V13.5556C3 12.451 3.89543 11.5556 5 11.5556Z"
      stroke={`${props.stroke ? props.stroke : "#E4E2D8"}`}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default UnlockIcon;
