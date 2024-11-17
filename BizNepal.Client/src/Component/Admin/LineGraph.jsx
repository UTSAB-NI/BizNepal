import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineChartComponent = ({ data,labels,grapheader }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: grapheader,
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const optons = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };
  return <Line data={chartData} options={optons} />;
};

export default LineChartComponent;
