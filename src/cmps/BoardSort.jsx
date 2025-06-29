export function boardSort(board, field, direction) {
  if (!field) return board;

  function cleanText(value) {
    if (!value || !value.trim()) return '';
    return value.replace(/[^\w\s\u0590-\u05FF]/g, '').trim().toLowerCase();
  }

  const allTasksWithGroups = [];
  board.groups.forEach(function(group) {
    group.tasks.forEach(function(task) {
      allTasksWithGroups.push({
        task,
        groupId: group.id,
        groupTitle: group.title
      });
    });
  });

  allTasksWithGroups.sort(function(a, b) {
    let aValue = a.task[field];
    let bValue = b.task[field];

    if (field === 'priority') {
      const priorityOrder = {
        'critical': 5,
        'high': 4,
        'medium': 3,
        'low': 2
      };
      const aClean = cleanText(aValue);
      const bClean = cleanText(bValue);
      aValue = aClean ? priorityOrder[aClean] || 1 : 1;
      bValue = bClean ? priorityOrder[bClean] || 1 : 1;
      if (direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    } else if (field === 'status') {
      const statusOrder = {
        'Done': 4,
        'Working on it': 3,
        'Stuck': 2,
        'Not Started': 1
      };
      aValue = statusOrder[aValue] ?? -1;
      bValue = statusOrder[bValue] ?? -1;
      if (direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    } else if (field === 'dueDate') {
      if (aValue) {
        aValue = typeof aValue === 'string' ? new Date(aValue).getTime() : aValue;
      } else {
        aValue = -1;
      }
      if (bValue) {
        bValue = typeof bValue === 'string' ? new Date(bValue).getTime() : bValue;
      } else {
        bValue = -1;
      }
    } else if (field === 'createdAt') {
      if (aValue) {
        aValue = typeof aValue === 'string' ? new Date(aValue).getTime() : aValue;
      } else {
        aValue = -1;
      }
      if (bValue) {
        bValue = typeof bValue === 'string' ? new Date(bValue).getTime() : bValue;
      } else {
        bValue = -1;
      }
    } else if (field === 'title') {
      const aTitle = cleanText(aValue);
      const bTitle = cleanText(bValue);
      if (direction === 'asc') {
        return aTitle.localeCompare(bTitle, ['en', 'he']);
      } else {
        return bTitle.localeCompare(aTitle, ['en', 'he']);
      }
    } else if (field === 'assignee') {
      aValue = cleanText(aValue);
      bValue = cleanText(bValue);
    } else if (field === 'members') {
      aValue = a.task.members ? a.task.members.length : 0;
      bValue = b.task.members ? b.task.members.length : 0;
    } else if (field === 'timeline') {
      function getStart(timeline) {
        if (!timeline || !timeline.startDate) return -1;
        return new Date(timeline.startDate).getTime();
      }
      aValue = getStart(a.task.timeline);
      bValue = getStart(b.task.timeline);
    } else if (field === 'files') {
      aValue = Array.isArray(a.task.files) ? a.task.files.length : 0;
      bValue = Array.isArray(b.task.files) ? b.task.files.length : 0;
    } else {
      aValue = cleanText(aValue);
      bValue = cleanText(bValue);
    }

    if (field === 'priority') {
      return 0;
    } else if (field === 'status') {
      return 0;
    } else if (field === 'title') {
      return 0;
    } else {
      if (direction === 'asc') {
        if (aValue === '' || aValue === -1) return 1;
        if (bValue === '' || bValue === -1) return -1;
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        if (aValue === '' || aValue === -1) return -1;
        if (bValue === '' || bValue === -1) return 1;
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    }
  });

  const sortedGroups = board.groups.map(function(group) {
    const groupTasks = allTasksWithGroups
      .filter(function(item) {
        return item.groupId === group.id;
      })
      .map(function(item) {
        return item.task;
      });
    return {
      ...group,
      tasks: groupTasks
    };
  });

  return {
    ...board,
    groups: sortedGroups
  };
} 