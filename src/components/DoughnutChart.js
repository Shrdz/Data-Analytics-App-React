import React from "react";
import { Doughnut } from 'react-chartjs-2';
import '../App.css';

function DoughnutChart(props) {
  let advIdArray = [], dataArray = [];
  let chartData = props.data;
  chartData.map(id => advIdArray.push(id.advertiserId));
  chartData.map(id => dataArray.push(+id.CM001_percent * 100));

  //generate random color
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let color = chartData.map(getRandomColor);
  const data = {
    labels: advIdArray,
    datasets: [
      {
        label: 'Advertisement',
        data: dataArray,
        backgroundColor: color
      }
    ]
  }

  return (
    <div className="chart">
      <Doughnut data={data} width={400} height={400} options={{ maintainAspectRatio: false }} />
    </div>
  );

}
export default DoughnutChart;