// Status Icon - Green square with 3 white lines
export function StatusSvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#00c875"/>
            <rect x="5" y="6" width="10" height="1.5" rx="0.75" fill="white"/>
            <rect x="5" y="9.25" width="10" height="1.5" rx="0.75" fill="white"/>
            <rect x="5" y="12.5" width="10" height="1.5" rx="0.75" fill="white"/>
        </svg>
    )
}

// Priority Icon - Red square with white exclamation
export function PrioritySvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#e2445c"/>
            <rect x="9" y="5" width="2" height="8" rx="1" fill="white"/>
            <circle cx="10" cy="15" r="1" fill="white"/>
        </svg>
    )
}

// Timeline Icon - Purple square with white timeline
export function TimelineSvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#5034ff"/>
            <rect x="4" y="9" width="12" height="2" rx="1" fill="white"/>
            <circle cx="6" cy="10" r="1.5" fill="white"/>
            <circle cx="14" cy="10" r="1.5" fill="white"/>
        </svg>
    )
}

// Files Icon - Teal square with white file icon
export function FilesSvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#00d2d2"/>
            <path d="M6 5V15C6 15.5523 6.44772 16 7 16H13C13.5523 16 14 15.5523 14 15V8L11 5H7C6.44772 5 6 5.44772 6 6Z" fill="white"/>
            <path d="M11 5V8H14" stroke="#00d2d2" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    )
}

// Members Icon - Blue square with white person icon
export function MembersSvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#0073ea"/>
            <circle cx="10" cy="8" r="2.5" fill="white"/>
            <path d="M5 15C5 12.7909 7.23858 11 10 11C12.7614 11 15 12.7909 15 15V15H5V15Z" fill="white"/>
        </svg>
    )
}

// Text Icon - Blue square with white 'T'
export function TextSvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#0073ea"/>
            <rect x="6" y="6" width="8" height="1.5" rx="0.75" fill="white"/>
            <rect x="9.25" y="6" width="1.5" height="8" rx="0.75" fill="white"/>
        </svg>
    )
}

// Numbers/Date Icon - Yellow square with white numbers
export function NumbersSvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#ffcb00"/>
            <text x="10" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">123</text>
        </svg>
    )
}

// Countries/Dropdown Icon - Red square with white checkmark
export function CountriesSvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#e2445c"/>
            <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

// Person Icon - Same as Members but different color
export function PersonSvg({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="3" fill="#66ccff"/>
            <circle cx="10" cy="8" r="2.5" fill="white"/>
            <path d="M5 15C5 12.7909 7.23858 11 10 11C12.7614 11 15 12.7909 15 15V15H5V15Z" fill="white"/>
        </svg>
    )
}

// Add/Plus Icon
export function Plus({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}