export function UserAvatar({
  src,
  fullname = '',
  alt = 'User avatar',
  title = '',
  className = '',
  ...props
}) {
  const getInitials = (name) => {
    if (!name) return '??';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        title={title || fullname}
        className={`user-avatar ${className}`}
        aria-hidden="true"
        {...props}
      />
    )
  }

  return (
    <div
      className={`user-avatar fallback-avatar ${className}`}
      title={title || fullname}
      {...props}
    >
      {getInitials(fullname)}
    </div>
  )
}