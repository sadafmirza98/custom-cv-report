import React from "react";
import CustomReport from "./components/CustomReport";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <header className="app-header" style={{ textAlign: "center" }}>
        <h1>Metrics Master</h1>
        <p>
          Your ultimate tool for crafting <span>insightful CV reports</span> and
          <span> stunning visual analytics</span>.
        </p>
      </header>
      <CustomReport />
    </div>
  );
};

export default App;
