import './styles.css';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart({chartData}) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Gráfico de barras',
      },
    },
  };

  const labels = [1,2,3,4];

  const data = {
    labels,
    datasets: [
      {
        label: 'Quantidade de habilidades',
        data: chartData.map(data => data),
        backgroundColor: 'rgb(0,150,255)',
      },
    ],
  };

  return (
    <div id="barChart" className="charts">
      <Bar options={options} data={data} />
    </div>
  );

}
