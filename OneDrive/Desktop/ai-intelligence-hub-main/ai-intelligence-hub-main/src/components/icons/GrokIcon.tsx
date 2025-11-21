import React from "react";

interface GrokIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const GrokIcon: React.FC<GrokIconProps> = ({ size = 24, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Grok logo - X shape with modern styling */}
      <path
        d="M12 2L2 12L12 22L22 12L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 8L16 16M16 8L8 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

