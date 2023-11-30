import * as React from "react";

interface IconCircleProps {
  className?: string; // CSS class name
  style?: React.CSSProperties; // Inline styles
}

const IconCircle: React.FC<IconCircleProps> = ({ className, style }) => (
  <svg
    width={100}
    height={100}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx={50} cy={50} r={10} fill="purple" />
  </svg>
);

export default IconCircle;
