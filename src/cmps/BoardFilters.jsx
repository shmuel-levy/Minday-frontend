import React, { useEffect } from 'react';
import { boardSort } from './BoardSort';

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
  function filterBoardByPerson(board, personId) {
    if (!personId) return board;

    const filteredGroups = board.groups.map(function(group) {
      const filteredTasks = group.tasks.filter(function(task) {
        if (task.members && task.members.length > 0) {
          const directMemberMatch = task.members.some(function(member) {
            return member._id === personId || member.id === personId;
          });
          if (directMemberMatch) return true;
        }
        
        return false;
      });
      
      return {
        ...group,
        tasks: filteredTasks
      };
    }).filter(function(group) {
      return group.tasks.length > 0;
    });

    return {
      ...board,
      groups: filteredGroups
    };
  }

  function filterBoardBySearch(board, searchTerm) {
    if (!searchTerm.trim()) return board;

    const searchLower = searchTerm.toLowerCase();
    
    function cleanText(value) {
      if (!value || !value.trim()) return '';
      return value.replace(/[^\w\s\u0590-\u05FF]/g, '').trim().toLowerCase();
    }
    
    const filteredGroups = board.groups.map(function(group) {
      const groupMatches = cleanText(group.title).includes(searchLower);
      
      const filteredTasks = group.tasks.filter(function(task) {
        const titleMatches = cleanText(task.title).includes(searchLower);
        const descriptionMatches = task.description && 
          cleanText(task.description).includes(searchLower);
        const membersMatch = task.members && task.members.some(function(member) {
          return member.fullname && cleanText(member.fullname).includes(searchLower);
        });
        return titleMatches || descriptionMatches || membersMatch;
      });

      if (groupMatches) {
        return {
          ...group,
          tasks: group.tasks
        };
      }

      return {
        ...group,
        tasks: filteredTasks
      };
    }).filter(function(group) {
      return group.tasks.length > 0;
    });

    return {
      ...board,
      groups: filteredGroups
    };
  }

  function filterAndSortBoard(board, filters) {
    let filteredBoard = { ...board };

    if (filters.searchText) {
      filteredBoard = filterBoardBySearch(filteredBoard, filters.searchText);
    }

    if (filters.selectedPersonId) {
      filteredBoard = filterBoardByPerson(filteredBoard, filters.selectedPersonId);
    }

    if (filters.selectedSortField) {
      filteredBoard = boardSort(filteredBoard, filters.selectedSortField, filters.sortDirection);
    }

    return filteredBoard;
  }

  useEffect(function() {
    if (!board) return;

    const filters = {
      searchText,
      selectedPersonId,
      selectedSortField,
      sortDirection
    };

    const newFilteredBoard = filterAndSortBoard(board, filters);

    if (onFilteredBoardChange) {
      onFilteredBoardChange(newFilteredBoard);
    }
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [board, searchText, selectedPersonId, selectedSortField, sortDirection, onFilteredBoardChange, onFiltersChange]);
} 