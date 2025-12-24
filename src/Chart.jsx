import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function Chart({ data, type, options }) {
  return (
    <>
      {(type === "doughnut" && Object.keys(data).length > 0) && <Doughnut data={data} />}

      {(type === "line" && Object.keys(data).length > 0) && <Line data={data} options={options} />}
    </>
  );
}

export default Chart;
