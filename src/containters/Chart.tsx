'use client'

import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js'

type Props = {
  challengeType: string
  // eslint-disable-next-line react/require-default-props
  spendingData?: number[]
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const generateLabels = (): string[] => {
  const labels: string[] = []
  const currentDate = new Date()

  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    )
    const month = date.toLocaleString('ko-KR', { month: 'short' })
    labels.push(month)
  }

  return labels
}

function MyChart({ challengeType, spendingData }: Props) {
  const [chartData, setChartData] = useState<number[]>(
    spendingData || [150, 200, 250, 230, 270, 350], // 더미 데이터
  )

  useEffect(() => {
    const fetchData = async () => {
      // 실제 API 호출

      // 임의 세팅
      setTimeout(() => {
        setChartData([180, 220, 300, 260, 290, 400])
      }, 1000)
    }

    fetchData()
  }, [])

  let datasetLabel
  if (challengeType === '술값 줄이기 챌린지') {
    datasetLabel = '유흥비'
  } else if (challengeType === '커피 줄이기 챌린지') {
    datasetLabel = '카페'
  } else {
    datasetLabel = '배달음식'
  }

  const data: ChartData<'bar', number[], string> = {
    labels: generateLabels(),
    datasets: [
      {
        label: datasetLabel,
        data: chartData,
        backgroundColor: chartData.map((_, index) =>
          index === 5 ? 'rgba(0, 70, 255, 1)' : 'rgba(217, 217, 217, 1)',
        ),
        borderColor: ['rgba(0, 0, 0, 0)'],
        borderWidth: 0,
        borderRadius: 5,
        barThickness: 28,
        categoryPercentage: 0.5,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
          stepSize: 100,
        },
        afterDataLimits: (scale: { max: number }) => {
          // eslint-disable-next-line no-param-reassign
          scale.max *= 1.2
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default MyChart
