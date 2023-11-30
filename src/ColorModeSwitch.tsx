import React, { useState } from "react";

const ColorModeSwitch: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can add logic here to toggle your application's color mode
  };

  return (
    <div className="color-mode-switch">
      <button
        className={`toggle-button ${isDarkMode ? "dark" : "light"}`}
        onClick={toggleColorMode}
      >
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default ColorModeSwitch;
