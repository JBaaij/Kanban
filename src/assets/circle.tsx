import * as React from "react";

interface IconCircleProps {
  className?: string; // CSS class name
  style?: React.CSSProperties; // Inline styles
  circleCx?: number; // X-coordinate of the circle's center
  circleCy?: number; // Y-coordinate of the circle's center
  circleRadius?: number; // Radius of the circle
  circleFill?: string; // Fill color of the circle
}
const IconCircle: React.FC<IconCircleProps> = ({
  className,
  style,
  circleCx = 50,
  circleCy = 50,
  circleRadius = 8,
  circleFill = "purple",
}) => (
  <svg
    width={100}
    height={100}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx={circleCx} cy={circleCy} r={circleRadius} fill={circleFill} />
  </svg>
);

export default IconCircle;
