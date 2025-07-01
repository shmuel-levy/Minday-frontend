export function canEditOrDelete(item, user) {
  if (!user) return false;
  if (item.isDemo) {
    return user.isAdmin;
  }
  // For user-created data, allow admin or owner
  return user.isAdmin || (item.createdBy?._id === user._id);
} 