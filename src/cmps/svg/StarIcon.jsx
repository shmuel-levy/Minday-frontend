export function StarIcon({ isStarred = false, className = "", onClick }) {
    return (
        <button 
            className={`star-icon-btn ${isStarred ? 'starred' : ''} ${className}`}
            onClick={onClick}
            type="button"
        >
            {isStarred ? (
                // Filled star when starred
                <svg 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    width="20" 
                    height="20" 
                    aria-hidden="true" 
                    className="star-icon filled"
                >
                    <path 
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        fill="currentColor"
                    />
                </svg>
            ) : (
                // Outlined star when not starred
                <svg 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    width="20" 
                    height="20" 
                    aria-hidden="true" 
                    className="star-icon outlined"
                >
                    <path 
                        d="M11.234 3.016a1.379 1.379 0 0 0-2.47 0l-1.78 3.61-3.99.584h-.003a1.376 1.376 0 0 0-.754 2.348v.001l2.878 2.813-.68 3.97v.001a1.376 1.376 0 0 0 2.005 1.45L10 15.921l3.549 1.866a1.377 1.377 0 0 0 2.005-1.45v-.001l-.68-3.97 2.882-2.81v-.001a1.377 1.377 0 0 0-.753-2.348l-3.989-.58-1.78-3.61Zm-1.235.888L8.3 7.35a1.378 1.378 0 0 1-1.034.752l-3.803.557 2.747 2.685a1.376 1.376 0 0 1 .395 1.22l-.649 3.79 3.404-1.79a1.377 1.377 0 0 1 1.28 0l3.395 1.785-.65-3.79v-.002a1.374 1.374 0 0 1 .396-1.218l2.751-2.683-3.796-.554a1.382 1.382 0 0 1-1.037-.752L10 3.904Z" 
                        fillRule="evenodd" 
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </button>
    )
}