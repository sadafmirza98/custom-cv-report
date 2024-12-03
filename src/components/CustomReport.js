import React, { useState } from "react";
import MetricSelector from "./MetricSelector";
import GraphView from "./GraphView";
import { downloadExcel } from "./csvGenerator";

const metricsList = [
  "Master-O ID",
  "Count",
  "Distinct Count",
  "Content Launch Date",
  "Challenges Status",
  "Completion Status",
  "Completion Date",
  "Completed In Days",
  "Attempts",
  "Score",
  "Max Score",
  "Time Spent",
  "Microskill Name",
  "Login Status",
  "Last Login Date",
];

const CustomReport = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [graphImage, setGraphImage] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  const handleMetricChange = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((item) => item !== metric)
        : [...prev, metric]
    );
  };

  const handleGenerateReport = () => {
    if (selectedMetrics.length === 0) {
      alert("Please select at least one metric.");
      return;
    }
    setShowGraph(true);
  };

  const handleDownloadExcel = () => {
    if (selectedMetrics.length === 0) {
      alert("Please select at least one metric.");
      return;
    }
    if (graphData.length === 0) {
      alert("Please generate the graph first.");
      return;
    }
    downloadExcel(selectedMetrics, graphData, graphImage);
  };

  return (
    <div className="custom-report">
      <MetricSelector
        metrics={metricsList}
        selectedMetrics={selectedMetrics}
        onMetricChange={handleMetricChange}
      />
      <div className="report-actions">
        <button onClick={handleGenerateReport}>Generate Report</button>
        <button onClick={handleDownloadExcel}>Download Excel</button>{" "}
        {/* Button now says 'Download Excel' */}
      </div>
      {showGraph && (
        <GraphView
          selectedMetrics={selectedMetrics}
          setGraphData={setGraphData}
          setGraphImage={setGraphImage}
        />
      )}
    </div>
  );
};

export default CustomReport;
