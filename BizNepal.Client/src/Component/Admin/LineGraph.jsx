import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

const LineChartComponent = ({ data, labels, grapheader }) => {
  const chartRef = useRef(null);

  // Chart data and options
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: grapheader,
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensure y-axis increments by 1
          precision: 0, // Ensure no decimal places
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Line ref={chartRef} data={chartData} options={options} />;
};

export default LineChartComponent;
