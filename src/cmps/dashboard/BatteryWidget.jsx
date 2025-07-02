import React from 'react';


export function BatteryWidget({ percentage }) {
  return (
    <div className="battery-widget-container">
      <div className="battery-wrapper">
        <div
          className="battery-fill"
          style={{ height: `${percentage}%` }}
        />
        <div className="battery-tip"></div>
        <div className="battery-percentage">{percentage}%</div>
      </div>
    </div>
  );
}

export function StatusBattery({ board }) {
  if (!board || !board.groups) return null;

  let totalTasks = 0;
  let doneTasks = 0;

  board.groups.forEach(group => {
    group.tasks.forEach(task => {
      totalTasks++;
      if ((task.status && task.status.label === 'Done') || task.status === 'Done') {
        doneTasks++;
      }
    });
  });

  const percentage = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <BatteryWidget percentage={percentage} />
      <div style={{ fontSize: '1.1em', color: '#323338', fontWeight: 500 }}>
        {percentage}%
        <span style={{ marginInlineStart: 8, color: '#676879', fontSize: '0.95em' }}>
          ({doneTasks}/{totalTasks})
        </span>
      </div>
    </div>
  );
}
