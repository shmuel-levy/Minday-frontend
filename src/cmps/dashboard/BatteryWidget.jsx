export function StatusBattery({ board }) {
  const tasks = board?.groups?.flatMap(group => group.tasks) || [];
  const doneTasks = tasks.filter(task => task.status?.label === 'Done').length;
  const totalTasks = tasks.length;
  const percentage = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  let color = 'gray';
  if (percentage === 100) color = 'green';
  else if (percentage > 0 && percentage < 100) color = 'yellow';
  else color = 'gray';

  return (
    <div className="battery-widget">
      <div className="battery-progress">
        <div className="battery-bar">
          <div 
            className="battery-fill" 
            style={{ 
              width: `${percentage}%`, 
              backgroundColor: color === 'green' ? '#00C875' : color === 'yellow' ? '#FDBA3B' : '#C4C4C4' 
            }}
          ></div>
        </div>
        <div className="battery-label">{percentage}%</div>
      </div>
    </div>
  );
}