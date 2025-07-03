export function WarningIcon({ className = "", ...props }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            width="16"
            height="16"
            aria-hidden="true"
            className={`app-icon ${className}`}
            data-testid="icon"
            data-vibe="Icon"
            {...props}
        >
            <path
                fill="currentColor"
                d="M10 1.667c.92 0 1.667.747 1.667 1.666v8.334c0 .919-.747 1.666-1.667 1.666s-1.667-.747-1.667-1.666V3.333c0-.919.747-1.666 1.667-1.666z"
            />
            <path
                fill="currentColor"
                d="M10 15.833a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334z"
            />
        </svg>
    );
}