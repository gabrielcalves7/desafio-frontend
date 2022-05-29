import React, {useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './styles.css';

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart ({chartData}) {
  function getPokemonTypeAndAmount(){
    let returnArray = Array();
    let arrayAmount = []
    let arrayType = []
    chartData.map(pokemonsType => {
      arrayType.push(pokemonsType.name)
      arrayAmount.push(pokemonsType.amount)
    })
    returnArray['type'] = arrayType;
    returnArray['amount'] = arrayAmount;
    return returnArray;
  }
  const generalChartData = getPokemonTypeAndAmount();
  const types = generalChartData['type'];
  const amount = generalChartData['amount'];
  const data = {
    labels: types,
    datasets: [
      {
        label: '# of Pokemon Types',
        data: amount,
        backgroundColor: [
          'rgb(255,99,132)',
          'rgba(54, 162, 235)',
          'rgb(235,205,54)',
          'rgb(86,235,255)',
          'rgb(119,119,119)',
          'rgb(75,192,85)',
          'rgb(21,103,103)',
          'rgb(0,0,0)',
          'rgb(137,86,206)',
          'rgba(220,255,64,0.52)',
          'rgba(255,64,64,0.49)',
        ],
        borderColor: [
          'rgb(255,99,132)',
          'rgba(54, 162, 235)',
          'rgb(235,205,54)',
          'rgb(86,235,255)',
          'rgb(119,119,119)',
          'rgb(75,192,85)',
          'rgb(21,103,103)',
          'rgb(0,0,0)',
          'rgb(137,86,206)',
          'rgba(220,255,64,0.52)',
          'rgba(255,64,64,0.49)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div id="pieChart" className="charts">
      <Pie data={data} />
    </div>
  );

}
