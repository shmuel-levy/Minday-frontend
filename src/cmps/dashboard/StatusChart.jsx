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

export function StatusChart({board}) {
  const labels = ['Not Started', 'Working on it', 'Stuck', 'Done'];
  const colors = ['#C4C4C4', '#FDBA3B', '#E94F64', '#00C875'];

  const getStatusCounts = () => {
    const counts = {
      'Not Started': 0,
      'Working on it': 0,
      'Stuck': 0,
      'Done': 0,
    };

    if (board?.groups) {
      board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (!task.status || task.status === '' || task.status === 'Not Started') {
            counts['Not Started']++;
          } else if (counts.hasOwnProperty(task.status)) {
            counts[task.status]++;
          }
        });
      });
    }

    return labels.map((label) => counts[label]);
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
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#eee' }, beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <section
      className="status-chart-container"
      style={{
        margin: 'auto',
        position: 'relative',
        height: '100%',
        width: '100%',
        minHeight: 0,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <Bar options={options} data={data} style={{ width: '100%', height: '100%' }} />
      </div>
    </section>
  );
}
