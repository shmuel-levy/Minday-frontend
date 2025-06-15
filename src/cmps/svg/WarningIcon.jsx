export function WarningIcon({ className = "", ...props }) {
    return (
        <span 
            className={`icon icon-v2-exclamation deadline-icon overdue ${className}`}
            style={{ fontSize: '13px', color: 'currentColor' }}
            {...props}
        >
            ⚠
        </span>
    );
}