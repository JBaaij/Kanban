import * as React from "react";

// Define the props interface
interface IconMenuProps {
  width?: number;
  height?: number;
  // Add any other props you need
}

// Functional component
const IconMenu: React.FC<IconMenuProps> = ({
  width = 5,
  height = 20,
  ...restProps
}) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <g fill="#828FA3" fillRule="evenodd">
      <circle cx={2.308} cy={2.308} r={2.308} />
      <circle cx={2.308} cy={10} r={2.308} />
      <circle cx={2.308} cy={17.692} r={2.308} />
    </g>
  </svg>
);

export default IconMenu;
