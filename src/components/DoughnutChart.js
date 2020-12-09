import React from "react";
import { Line } from 'react-chartjs-2';
import '../App.css';

function DoughnutChart(props) {
  let advIdArray = [], dataArray = [], isoDates = [];

  let chartData = props.data;
  console.log(chartData)
  chartData.map(id => advIdArray.push(id.day));
  chartData.map(id => dataArray.push(+id.CM001 * 100));

  //generate random color
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //date in ISO dates
  advIdArray.sort(); // to display from start date
  isoDates = advIdArray.map((d) => {
    d = +d;
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const dateObj = new Date(d);
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = month + '\n' + day + ',' + year;
    return output;
  })
  // console.log(advIdArray)
  // console.log(isoDates)

  let color = chartData.map(getRandomColor);
  const data = {
    labels: isoDates,
    datasets: [
      {
        label: "First dataset",
        data: dataArray,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  }

  return (
    <div className="chart">
      <Line data={data} width={400} height={400} options={{ maintainAspectRatio: false }} />
    </div>
  );

}
export default DoughnutChart;