export function StarToggle({ isFilled, onToggle }) {
  return (
    <button className="star-btn" onClick={onToggle} aria-label="Toggle Favorite">
      {isFilled ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#FFD700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.3l6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#666"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.3l6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      )}
    </button>
  )
}
