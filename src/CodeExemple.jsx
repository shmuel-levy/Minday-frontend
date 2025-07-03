import React, { useEffect } from "react"
import { boardSort } from "./BoardSort"
import { advancedFilter } from "./AdvancedFilters"

export function BoardFilters({
  board,
  onFiltersChange,
  onFilteredBoardChange,
  searchText,
  selectedPersonId,
  selectedSortField,
  sortDirection,
  advancedFilters,
}) {
  const filters = {
    searchText,
    selectedPersonId,
    selectedSortField,
    sortDirection,
    advancedFilters,
  }

  const cleanText = (str) =>
    (str || "")
      .replace(/[^\w\s\u0590-\u05FF]/g, "")
      .toLowerCase()
      .trim()

  const matchesSearch = (text, searchTerm) =>
    cleanText(text).includes(cleanText(searchTerm))

  const filterBoard = (board) => {
    if (!board) return null

    let updated = { ...board }

    if (filters.searchText) {
      updated.groups = updated.groups
        .map((group) => ({
          ...group,
          tasks: group.tasks.filter(
            (task) =>
              matchesSearch(task.title, filters.searchText) ||
              matchesSearch(task.description, filters.searchText) ||
              (task.members || []).some((m) =>
                matchesSearch(m?.fullname, filters.searchText)
              )
          ),
        }))
        .filter((g) => g.tasks.length)
    }

    if (filters.selectedPersonId) {
      updated.groups = updated.groups
        .map((group) => ({
          ...group,
          tasks: group.tasks.filter(
            (task) =>
              task.assignee === filters.selectedPersonId ||
              (task.members || []).some(
                (m) =>
                  m === filters.selectedPersonId ||
                  m?.id === filters.selectedPersonId ||
                  m?._id === filters.selectedPersonId
              )
          ),
        }))
        .filter((g) => g.tasks.length)
    }

    if (filters.advancedFilters?.length)
      updated = advancedFilter(updated, filters.advancedFilters)

    if (filters.selectedSortField)
      updated = boardSort(
        updated,
        filters.selectedSortField,
        filters.sortDirection
      )

    return updated
  }

  useEffect(() => {
    const newBoard = filterBoard(board)
    onFilteredBoardChange?.(newBoard)
    onFiltersChange?.(filters)
  }, [
    board,
    searchText,
    selectedPersonId,
    selectedSortField,
    sortDirection,
    advancedFilters,
  ])

  return null
}
