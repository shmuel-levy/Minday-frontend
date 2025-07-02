import React, { useEffect } from 'react';
import { boardSort } from './BoardSort';
import { advancedFilter } from './AdvancedFilters';

export function BoardFilters({ 
  board, 
  onFiltersChange,
  searchText,
  selectedPersonId,
  selectedSortField,
  sortDirection,
  advancedFilters,
  onFilteredBoardChange
}) {
  function filterByPerson(board, personId) {
    if (!personId) return board;

    const filteredGroups = board.groups.map(group => {
      const filteredTasks = group.tasks.filter(task => {
        const isAssignee = task.assignee === personId;
        const isMember = Array.isArray(task.members) && task.members.some(member => {
          if (typeof member === 'string') return member === personId;
          return member._id === personId || member.id === personId;
        });
        return isAssignee || isMember
      });

      return { ...group, tasks: filteredTasks }
    }).filter(group => group.tasks.length > 0)
    return { ...board, groups: filteredGroups }
  }

  function filterBySearch(board, searchTerm) {
    if (!searchTerm.trim()) return board
    const lowerSearch = searchTerm.toLowerCase()

    function clean(value) {
      if (!value) return '';
      return value.replace(/[^\w\s\u0590-\u05FF]/g, '').trim().toLowerCase();
    }

    const filteredGroups = board.groups.map(group => {
      const groupMatches = clean(group.title).includes(lowerSearch);

      const filteredTasks = group.tasks.filter(task => {
        const titleMatch = clean(task.title).includes(lowerSearch);
        const descMatch = task.description && clean(task.description).includes(lowerSearch);
        const memberMatch = task.members && task.members.some(member => member.fullname && clean(member.fullname).includes(lowerSearch));
        return titleMatch || descMatch || memberMatch;
      });

      if (groupMatches) {
        return { ...group, tasks: group.tasks };
      }
      return { ...group, tasks: filteredTasks };
    }).filter(group => group.tasks.length > 0);

    return { ...board, groups: filteredGroups };
  }

  function applyFiltersAndSort(board, filters) {
    let updatedBoard = { ...board }

    if (filters.searchText) {
      updatedBoard = filterBySearch(updatedBoard, filters.searchText);
    }

    if (filters.selectedPersonId) {
      updatedBoard = filterByPerson(updatedBoard, filters.selectedPersonId);
    }

    if (filters.advancedFilters && filters.advancedFilters.length > 0) {
      updatedBoard = advancedFilter(updatedBoard, filters.advancedFilters);
    }

    if (filters.selectedSortField) {
      updatedBoard = boardSort(updatedBoard, filters.selectedSortField, filters.sortDirection);
    }

    return updatedBoard;
  }

  useEffect(() => {
    if (!board) return;

    const filters = {
      searchText,
      selectedPersonId,
      selectedSortField,
      sortDirection,
      advancedFilters
    }

    const newBoard = applyFiltersAndSort(board, filters)

    onFilteredBoardChange?.(newBoard)
    onFiltersChange?.(filters)
  }, [board, searchText, selectedPersonId, selectedSortField, sortDirection, advancedFilters, onFilteredBoardChange, onFiltersChange]);

  return null
}