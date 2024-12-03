import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphView = ({ selectedMetrics, setGraphData, setGraphImage }) => {
  const [dummyData, setDummyData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Generate random data
    const data = Array.from({ length: 5 }, () =>
      selectedMetrics.map(() => parseFloat(Math.random().toFixed(2)))
    );
    setDummyData(data);
    setGraphData(data);

    // Generate base64 image after the chart is rendered
    if (chartRef.current) {
      setTimeout(() => {
        const base64Image = chartRef.current.toBase64Image();
        setGraphImage(base64Image);
      }, 500); // Allow time for chart rendering
    }
  }, [selectedMetrics, setGraphData, setGraphImage]);

  const data = {
    labels: ["Record 1", "Record 2", "Record 3", "Record 4", "Record 5"],
    datasets: selectedMetrics.map((metric, index) => ({
      label: metric,
      data: dummyData.map((row) => row[index]),
      backgroundColor: `rgba(${(index * 50) % 255}, ${(index * 70) % 255}, ${
        (index * 90) % 255
      }, 0.6)`,
      borderColor: `rgba(${(index * 50) % 255}, ${(index * 70) % 255}, ${
        (index * 90) % 255
      }, 1)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...dummyData.flat()) * 1.2,
      },
    },
  };

  return (
    <div className="graph-view">
      <h3>Report Graphs</h3>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "400px",
          margin: "0 auto",
        }}
      >
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default GraphView;
