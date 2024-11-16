import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useGetbusinessQuery } from "../../slices/userApiSlices";

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BusinessBarGraph = () => {
  const { data: businesses, isLoading, isError } = useGetbusinessQuery();
  const [chartData, setChartData] = useState({
    labels: [], // Years will be stored here
    datasets: [
      {
        label: "Number of Businesses",
        data: [], // The count of businesses per year
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
   if(!businesses || isLoading || isError) return;
    // Process the business data to count businesses by year
    const businessCountByYear = {};

    businesses.forEach((business) => {
      const year = new Date(business.createdAt).getFullYear();
      businessCountByYear[year] = (businessCountByYear[year] || 0) + 1;
    });

    const years = Object.keys(businessCountByYear);
    const counts = Object.values(businessCountByYear);

    // Update the chart data
    setChartData({
      labels: years,
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
      <h2>Business Created Per Year</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Businesses Created Per Year' } } }} />
      )}
    </div>
  );
};

export default BusinessBarGraph;
