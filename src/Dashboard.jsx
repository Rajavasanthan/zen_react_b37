import { useEffect, useState } from "react";
import Card from "./Card";
import Chart from "./Chart";
import axios from "axios";

function Dashboard() {
  const [dougnutdata, setDougnutdata] = useState({});
  const [lineData, setLineData] = useState({});
  const [lineOptions, setLineOptions] = useState({
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 3,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Number of Users",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  });

  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const manipulate = (stats) => {
    const categoryCount = stats.reduce((acc, user) => {
      acc[user.category] = (acc[user.category] || 0) + 1;
      return acc;
    }, {});
    setDougnutdata({
      labels: Object.keys(categoryCount),
      datasets: [
        {
          label: "User Category Distribution",
          data: Object.values(categoryCount),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

    const userByMonth = stats.reduce((acc, user) => {
      const month = user.doj.split("-")[1];
      const monthName = monthMap[month];
      acc[monthName] = (acc[monthName] || 0) + 1;
      return acc;
    }, {});

    const dataValues = allMonths.map((month) => userByMonth[month] || 0);

    const maxusers = Math.max(...Object.values(userByMonth));

    setLineData({
      labels: allMonths,
      datasets: [
        {
          label: "Users Joined Over Months",
          data: Object.values(dataValues),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
          fill: true,
        },
      ],
    });

    setLineOptions((prev) => ({
      ...prev,
      scales: {
        ...prev.scales,
        y: {
          ...prev.scales.y,
          max: maxusers + 1,
        },
      },
    }));
    console.log(categoryCount);
    console.log(userByMonth);
  };

  useEffect(() => {
    const getStasData = async () => {
      try {
        const stats = await axios.get(
          "https://6461c1c2491f9402f4aa0565.mockapi.io/users"
        );
        manipulate(stats.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStasData();
  }, []);

  return (
    <div className="w-full ">
      <div className="w-7xl mx-auto ">
        <h1 className="text-2xl">Dashboard</h1>
        {/* <div className="flex gap-4 pt-5">
          <Card />
          <Card />
          <Card />
        </div> */}
        <div className="flex gap-4 pt-5">
          <div className="w-1/2">
            <Chart data={dougnutdata} type={"doughnut"} />
          </div>
          <div className="w-1/2">
            <Chart data={lineData} type={"line"} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
