import React from 'react';

export function BatteryWidget({ percentage, tasks = [] }) {
  // Calculate progress for different statuses
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(task => 
    (task.status && task.status.label === 'Done') || task.status === 'Done'
  ).length;
  const inProgressTasks = tasks.filter(task => 
    (task.status && task.status.label === 'Working on it') || task.status === 'Working on it'
  ).length;
  const stuckTasks = tasks.filter(task => 
    (task.status && task.status.label === 'Stuck') || task.status === 'Stuck'
  ).length;
  const notStartedTasks = totalTasks - doneTasks - inProgressTasks - stuckTasks;

  const donePercentage = totalTasks ? (doneTasks / totalTasks) * 100 : 0;
  const inProgressPercentage = totalTasks ? (inProgressTasks / totalTasks) * 100 : 0;
  const stuckPercentage = totalTasks ? (stuckTasks / totalTasks) * 100 : 0;
  const notStartedPercentage = totalTasks ? (notStartedTasks / totalTasks) * 100 : 0;

  return (
    <div className="battery-widget-container">
      <div className="battery-wrapper">
        <div className="battery-body">
          <div className="battery-progress-bars">
            <div className="progress-segment done" style={{ width: `${donePercentage}%` }}></div>
            <div className="progress-segment in-progress" style={{ width: `${inProgressPercentage}%` }}></div>
            <div className="progress-segment stuck" style={{ width: `${stuckPercentage}%` }}></div>
            <div className="progress-segment not-started" style={{ width: `${notStartedPercentage}%` }}></div>
          </div>
        </div>
        <div className="battery-tip"></div>
        <div className="battery-percentage">{percentage}%</div>
      </div>
    </div>
  );
}

export function StatusBattery({ board }) {
  if (!board || !board.groups) {
    return null;
  }

  let totalTasks = 0;
  let doneTasks = 0;
  let allTasks = [];

  board.groups.forEach(group => {
    group.tasks.forEach(task => {
      totalTasks++;
      allTasks.push(task);
      if ((task.status && task.status.label === 'Done') || task.status === 'Done') {
        doneTasks++;
      }
    });
  });

  const percentage = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="status-battery-container">
      <BatteryWidget percentage={percentage} tasks={allTasks} />
      <div className="battery-stats">
        <div className="battery-percentage-text">{percentage}%</div>
        <div className="battery-task-count">
          ({doneTasks}/{totalTasks})
        </div>
      </div>
    </div>
  );
}
