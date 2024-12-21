import React, { useState } from "react";
import MetricSelector from "./MetricSelector";
import GraphView from "./GraphView";
import { downloadExcel } from "./csvGenerator";

const metricsList = [
  "User ID",
  "Total Logins",
  "Unique Visitors",
  "Session Duration",
  "Content Engagement Rate",
  "Task Completion Status",
  "Last Access Date",
  "Average Response Time",
  "Error Rate",
  "Customer Satisfaction Score",
  "Retention Rate",
  "Conversion Rate",
  "Bounce Rate",
  "Revenue Generated",
  "Number of Transactions",
  "Time to Completion",
  "Active Users",
  "Inactive Users",
  "Feature Usage Frequency",
  "Feedback Submission Count",
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
