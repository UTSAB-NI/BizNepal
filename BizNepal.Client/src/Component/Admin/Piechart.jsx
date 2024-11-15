import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetbusinessQuery } from "../../slices/userApiSlices";

// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const BusinessCategoryPieChart = () => {
  const { data: businesses, isLoading, isError } = useGetbusinessQuery();
  const [chartData, setChartData] = useState({
    labels: [], // Categories will be stored here
    datasets: [
      {
        label: "Businesses by Category",
        data: [], // Number of businesses in each category
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33F6",
          "#F6A833",
          "#33F6FF",
          "#F633FF",
          "#57FF33",
          "#5733FF",
          "#F63333",
        ], // Different colors for each category
      },
    ],
  });

  useEffect(() => {
    if(!isLoading || !isError || !businesses) return;

    // Group businesses by category
    const categoryCount = {};

    businesses.forEach((business) => {
      const category = business.category.categoryName; // Assuming businesses have a 'category' field
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Extract category names and counts
    const categories = Object.keys(categoryCount);
    const counts = categories.map((category) => categoryCount[category]);

    // Update the chart data
    setChartData({
      labels: categories,
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
      <h2>Businesses by Category</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Business Distribution by Category",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || "";
                    const value = context.raw;
                    return `${label}: ${value} businesses`;
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default BusinessCategoryPieChart;
