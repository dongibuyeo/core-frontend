import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'

interface Props {
  successPercentage: string
}

export default function PieChartComponent({ successPercentage }: Props) {
  const chartData = {
    datasets: [
      {
        data: [successPercentage, 100 - parseInt(successPercentage, 10)],
        backgroundColor: ['rgba(140, 210, 245, 1)', 'rgba(140, 210, 245, 0.4)'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    cutout: '0%',
    circumference: 360,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  return (
    <Doughnut data={chartData} options={chartOptions} className="rotate-90" />
  )
}
