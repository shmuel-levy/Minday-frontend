export function TaskCheckbox({ checked = false, onChange, disabled = false }) {
    return (
        <div
            className={`task-checkbox ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => {
                if (disabled) return;
                onChange?.(!checked);
            }}
        >
            {checked && (
                <svg viewBox="0 0 24 24" className="checkbox-checkmark">
                    <path
                        fill="white"
                        d="M20.285 6.709a1 1 0 0 0-1.414-1.418L9 15.163l-3.871-3.87a1 1 0 1 0-1.414 1.414l4.578 4.578a1 1 0 0 0 1.414 0l10.578-10.576z"
                    />
                </svg>
            )}
        </div>
    );
}