export function FavoriteToggleIcon({ isFavorite }) {
  return (
    <button className="btn-favorite-icon" aria-label="Toggle Favorite">
      <svg
        viewBox="0 0 24 24"
        fill={isFavorite ? '#FFD700' : 'none'}
        stroke={isFavorite ? '#FFD700' : '#4B4B4B'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="18"
        height="18"
        className="star-icon"
      >
        <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
      </svg>
    </button>
  )
}
