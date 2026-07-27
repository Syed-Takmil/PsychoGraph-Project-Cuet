'use client'

import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const labels = ['Neutral', 'Happy', 'Calm', 'Sad', 'Angry']

export default function RadarChart({ layered = false }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Current Session',
        data: [55, 65, 70, 45, 40],
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
        borderColor: '#a855f7',
        borderWidth: 2,
        pointBackgroundColor: '#a855f7',
        pointBorderColor: '#fff',
        pointRadius: 3,
      },
      ...(layered
        ? [
            {
              label: 'Baseline',
              data: [60, 50, 55, 55, 45],
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              borderColor: '#ec4899',
              borderWidth: 2,
              borderDash: [5, 5],
              pointBackgroundColor: '#ec4899',
              pointBorderColor: '#fff',
              pointRadius: 3,
            },
          ]
        : []),
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { display: false, stepSize: 20 },
        grid: { color: 'rgba(168, 85, 247, 0.12)' },
        angleLines: { color: 'rgba(168, 85, 247, 0.12)' },
        pointLabels: {
          color: '#a855f7',
          font: { size: 11, family: 'monospace' },
        },
      },
    },
    plugins: {
      legend: {
        display: layered,
        labels: { color: '#a855f7', font: { size: 11 } },
      },
    },
  }

  return (
    <div className="w-72 h-72 md:w-80 md:h-80">
      <Radar data={data} options={options} />
    </div>
  )
}
