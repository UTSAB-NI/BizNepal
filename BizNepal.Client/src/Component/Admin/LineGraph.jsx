import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useGetbusinessQuery } from "../../slices/userApiSlices";

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailyBusinessLineGraph = () => {
  const { data: businesses, isLoading, isError } = useGetbusinessQuery();
  const [chartData, setChartData] = useState({
    labels: [], // Dates will be stored here
    datasets: [
      {
        label: "Number of Businesses Created",
        data: [], // Number of businesses created each day
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      console.log("Failed to fetch businesses");
      return;
    }

    // Group businesses by date (day)
    const businessCountByDate = {};

    businesses.forEach((business) => {
      const date = new Date(business.createdAt).toLocaleDateString(); // Format date as "MM/DD/YYYY"
      businessCountByDate[date] = (businessCountByDate[date] || 0) + 1;
    });

    // Sort the dates and get the counts
    const dates = Object.keys(businessCountByDate).sort();
    const counts = dates.map((date) => businessCountByDate[date]);

    // Update the chart data
    setChartData({
      labels: dates,
      datasets: [
        {
          ...chartData.datasets[0],
          data: counts,
        },
      ],
    });
  }, [businesses, isLoading, isError]);

  return (
    <div>
      <h2>Daily Business Creation</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Businesses Created Daily",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || '';
                    const value = context.raw;
                    return `${label}: ${value} businesses`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10, // Limit the number of ticks on x-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Businesses',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default DailyBusinessLineGraph;
