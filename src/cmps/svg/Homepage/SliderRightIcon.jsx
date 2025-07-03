export function SliderRightIcon(props) {
  return (
    <svg
      width="55"
      height="55"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}   /* allow size / className overrides */
    >
      <circle
        cx="31"
        cy="31"
        r="30.5"
        transform="matrix(-1 0 0 1 62 0)"
        fill="#181B34"
        stroke="currentColor"
      />
      <path
        d="M43.7071 30.2929C44.0976 30.6834 44.0976 31.3166 43.7071 31.7071L37.3431 38.0711C36.9526 38.4616 36.3195 38.4616 35.9289 38.0711C35.5384 37.6805 35.5384 37.0474 35.9289 36.6569L41.5858 31L35.9289 25.3431C35.5384 24.9526 35.5384 24.3195 35.9289 23.9289C36.3195 23.5384 36.9526 23.5384 37.3431 23.9289L43.7071 30.2929ZM19 30L43 30V32H19V30Z"
        fill="white"
      />
    </svg>
  );
}