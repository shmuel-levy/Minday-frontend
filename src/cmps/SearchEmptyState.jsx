export function SearchEmptyState() {
  return (
    <div className="search-empty-state">
      <img
        src="https://cdn.monday.com/images/search_empty_state.svg"
        alt="No results"
        className="search-empty-state__image"
      />
      <h2 className="search-empty-state__title">No matching items found</h2>
      <p className="search-empty-state__subtitle">
        Try changing your search terms or filters.
      </p>
    </div>
  )
} 