import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function StatusChart({ board }) {
  const labels = ['Not Started', 'Working on it', 'Stuck', 'Done'];
  const colors = ['#C4C4C4', '#FDBA3B', '#E94F64', '#00C875'];

  const getStatusCounts = () => {
    const counts = { 'Not Started': 0, 'Working on it': 0, 'Stuck': 0, 'Done': 0 };

    board?.groups?.forEach(group => {
      group.tasks?.forEach(task => {
        const status = task.status || 'Not Started';
        if (!status || status === '' || status === 'Not Started') {
          counts['Not Started']++;
        } else if (counts.hasOwnProperty(status)) {
          counts[status]++;
        }
      });
    });

    return labels.map(label => counts[label]);
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Count',
        data: getStatusCounts(),
        backgroundColor: colors,
        borderRadius: 8,
        barThickness: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#676879', font: { size: 12, weight: '500' } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#F0F0F0' },
        ticks: {
          precision: 0,
          stepSize: 1,
          color: '#676879',
        },
      },
    },
  };

  return (
    <section className="status-chart-container" style={{ width: '100%', height: '100%' }}>
      <Bar options={options} data={data} />
    </section>
  );
}