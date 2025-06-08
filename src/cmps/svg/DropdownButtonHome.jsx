export function DropdownHome({ width = 24, height = 24 }) {
    return (
        <svg 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            width={width} 
            height={height} 
            aria-hidden="true"
            style={{ cursor: 'pointer' }}
        >
            <path 
                d="M9.442 12.762a.77.77 0 0 0 1.116 0l4.21-4.363a.84.84 0 0 0 0-1.158.77.77 0 0 0-1.116 0L10 11.027 6.348 7.24a.77.77 0 0 0-1.117 0 .84.84 0 0 0 0 1.158l4.21 4.363Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </svg>
    );
}