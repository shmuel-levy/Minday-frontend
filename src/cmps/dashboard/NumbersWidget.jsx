import CountUp from 'react-countup';
import { ChartIcon } from '../svg/ChartIcon';
import { CheckmarkIcon } from '../svg/CheckmarkIcon';
import { ArrowIcon } from '../svg/ArrowIcon';
import { WarningIcon } from '../svg/WarningIcon';

export function NumbersWidget({ board }) {
  if (!board || !board.groups) {
    return null;
  }

  // Calculate various metrics
  let totalTasks = 0;
  let doneTasks = 0;
  let inProgressTasks = 0;
  let overdueTasks = 0;

  board.groups.forEach(group => {
    group.tasks.forEach(task => {
      totalTasks++;
      
      if ((task.status && task.status.label === 'Done') || task.status === 'Done') {
        doneTasks++;
      } else if ((task.status && task.status.label === 'Working on it') || task.status === 'Working on it') {
        inProgressTasks++;
      }
      
      // Check for overdue tasks (if due date exists)
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        if (dueDate < today && task.status !== 'Done') {
          overdueTasks++;
        }
      }
    });
  });

  const completionRate = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="numbers-widget">
      <div className="numbers-grid">
        <div className="number-card">
          <div className="number-icon total">
            <ChartIcon />
          </div>
          <div className="number-content">
            <div className="number-value">
              <CountUp end={totalTasks} duration={1} />
            </div>
            <div className="number-label">Total Tasks</div>
          </div>
        </div>
        
        <div className="number-card">
          <div className="number-icon completed">
            <CheckmarkIcon />
          </div>
          <div className="number-content">
            <div className="number-value">
              <CountUp end={doneTasks} duration={1} />
            </div>
            <div className="number-label">Completed</div>
          </div>
        </div>
        
        <div className="number-card">
          <div className="number-icon progress">
            <ArrowIcon direction="right" />
          </div>
          <div className="number-content">
            <div className="number-value">
              <CountUp end={inProgressTasks} duration={1} />
            </div>
            <div className="number-label">In Progress</div>
          </div>
        </div>
        
        <div className="number-card">
          <div className="number-icon overdue">
            <WarningIcon />
          </div>
          <div className="number-content">
            <div className="number-value">
              <CountUp end={overdueTasks} duration={1} />
            </div>
            <div className="number-label">Overdue</div>
          </div>
        </div>
      </div>
      
      <div className="completion-rate">
        <div className="rate-label">Completion Rate</div>
        <div className="rate-value">{completionRate}%</div>
        <div className="rate-bar">
          <div 
            className="rate-fill" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}