export function ArrowDownUpIcon({ direction = 'down', className = '', ...props }) {
  const rotationMap = {
    down: 'rotate(0deg)',
    up: 'rotate(180deg)',
  }

  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      width="18"
      height="18"
      style={{ transform: rotationMap[direction] || 'none' }}
      className={`arrow-icon ${className}`}
      {...props}
    >
      <path d="M9.442 12.762a.77.77 0 0 0 1.116 0l4.21-4.363a.84.84 0 0 0 0-1.158.77.77 0 0 0-1.116 0L10 11.027 6.348 7.24a.77.77 0 0 0-1.117 0 .84.84 0 0 0 0 1.158l4.21 4.363Z" />
    </svg>
  )
}
