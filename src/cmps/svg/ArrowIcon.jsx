export function ArrowIcon({ direction = 'left', className = '', ...props }) {
  const isRight = direction === 'right'

  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      width="16"
      height="16"
      aria-hidden="true"
className={`app-icon ${className}`}
      style={{ transform: isRight ? 'scaleX(-1)' : 'none' }}
      data-testid="icon"
      data-vibe="Icon"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.24 9.444a.77.77 0 0 0 0 1.116l4.363 4.21a.84.84 0 0 0 1.157 0 .77.77 0 0 0 0-1.116l-3.785-3.652 3.785-3.653a.77.77 0 0 0 0-1.116.84.84 0 0 0-1.157 0L7.24 9.443Z"
      />
    </svg>
  )
}
