import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);

  const toggleLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
  };

  return (
    <div className="container">
      {showLeftSidebar && (
        <div className="left-sidebar">
          {/* Title and buttons */}
          <div className="title">Title</div>
          <div className="buttons">
            <button>Button 1</button>
            <button>Button 2</button>
            {/* Add more buttons as needed */}
          </div>
          <button onClick={toggleLeftSidebar}>Remove Left Sidebar</button>
        </div>
      )}

      <div className="main-content">
        {/* Upper container */}
        <div>
          <div className="upper-container">
            <span>Name Board</span>
            <button>Button 3</button>
          </div>
          {/* Middle container with 3 columns */}
          <div className="middle-container">
            {/* 3 columns */}
            <div className="column">todo</div>
            <div className="column">doing</div>
            <div className="column">done</div>
            <div className="right-sidebar">
              <div></div>
            </div>
            <div className="column">Label 1</div>
            <div className="column">Label 2</div>
            <div className="column">Label 3</div>
            <div className="right-sidebar">
              <button>Button 4</button>
            </div>
            <div className="panel">Panel</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
