export function WorkspaceIcon({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 33 33"
      fill="currentColor"
      width="25"
      height="25"
      aria-hidden="true"
      className={`workspace-icon ${className}`}
      data-testid="topbar-icon"
      data-vibe="Icon"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path d="M20.3812 4.62863C20.3812 2.47439 18.6357 0.728027 16.4826 0.728027C14.3294 0.728027 12.584 2.47439 12.584 4.62863V8.91568C12.584 11.0699 14.3294 12.8163 16.4826 12.8163C18.6357 12.8163 20.3812 11.0699 20.3812 8.91568V4.62863Z" fill="url(#paint0)" />
        <path d="M5.11916 10.0994C3.07035 9.43366 0.870087 10.554 0.204732 12.6018C-0.460623 14.6495 0.660888 16.8492 2.7097 17.5149L6.78692 18.8397C8.83573 19.5054 11.036 18.385 11.7013 16.3373C12.3667 14.2895 11.2452 12.0898 9.19638 11.4241L5.11916 10.0994Z" fill="url(#paint1)" />
        <path d="M5.59794 26.3042C4.33171 28.0471 4.71733 30.4859 6.45925 31.7514C8.20117 33.017 10.6398 32.6301 11.906 30.8873L14.4259 27.419C15.6921 25.6762 15.3065 23.2374 13.5646 21.9718C11.8226 20.7062 9.38404 21.0931 8.1178 22.8359L5.59794 26.3042Z" fill="url(#paint2)" />
        <path d="M21.1629 30.8429C22.4291 32.5858 24.8677 32.9726 26.6096 31.7071C28.3516 30.4415 28.7372 28.0027 27.471 26.2599L24.9511 22.7916C23.6849 21.0488 21.2463 20.6619 19.5043 21.9275C17.7624 23.193 17.3768 25.6318 18.643 27.3747L21.1629 30.8429Z" fill="url(#paint3)" />
        <path d="M27.8808 10.0984C29.9296 9.43268 32.1299 10.5531 32.7953 12.6008C33.4606 14.6486 32.3391 16.8482 30.2903 17.5139L26.2131 18.8387C24.1643 19.5044 21.964 18.384 21.2987 16.3363C20.6333 14.2885 21.7548 12.0888 23.8036 11.4231L27.8808 10.0984Z" fill="url(#paint4)" />
        <path d="M16.5188 21.7056C18.6553 21.7056 20.3872 19.9736 20.3872 17.8372C20.3872 15.7007 18.6553 13.9688 16.5188 13.9688C14.3823 13.9688 12.6504 15.7007 12.6504 17.8372C12.6504 19.9736 14.3823 21.7056 16.5188 21.7056Z" fill="#6161FF" />
        <path d="M29.1028 17.6807C26.9547 17.6807 25.2134 15.9393 25.2134 13.7913C25.2134 11.6432 26.9547 9.90186 29.1028 9.90186C31.2508 9.90186 32.9922 11.6432 32.9922 13.7913C32.9922 15.9393 31.2508 17.6807 29.1028 17.6807Z" fill="#6161FF" />
      </g>
      <defs>
        <linearGradient id="paint0" x1="16.457" y1="-6.763" x2="16.543" y2="13.595" gradientUnits="userSpaceOnUse">
          <stop offset="0.411" stopColor="#6C6CFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6C6CFF" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="paint1" x1="-6.928" y1="10.311" x2="12.461" y2="16.521" gradientUnits="userSpaceOnUse">
          <stop offset="0.411" stopColor="#6C6CFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6C6CFF" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="paint2" x1="2.077" y1="37.827" x2="13.974" y2="21.306" gradientUnits="userSpaceOnUse">
          <stop offset="0.411" stopColor="#6C6CFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6C6CFF" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="paint3" x1="31.034" y1="37.753" x2="18.998" y2="21.333" gradientUnits="userSpaceOnUse">
          <stop offset="0.411" stopColor="#6C6CFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6C6CFF" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="paint4" x1="39.928" y1="10.31" x2="20.539" y2="16.52" gradientUnits="userSpaceOnUse">
          <stop offset="0.411" stopColor="#6C6CFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6C6CFF" stopOpacity="0.2" />
        </linearGradient>
        <clipPath id="clip0">
          <rect width="33" height="33" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
