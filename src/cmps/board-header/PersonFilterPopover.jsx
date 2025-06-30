import { useEffect, useRef } from 'react';
import { UserAvatar } from '../UserAvatar';

export function PersonFilterPopover({ isOpen, onClose, members = [], selectedId, onSelect, anchorRef }) {
  const popoverRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target) && (!anchorRef || !anchorRef.current || !anchorRef.current.contains(e.target))) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null

  return (
    <div className="person-filter-popover" ref={popoverRef}>
      <div className="popover-title">
        Filter this board by person
      </div>
      <div className="popover-subtitle">
        And find items they're working on.
      </div>
      <div className="popover-members-row">
        {members.length === 0 && <div className="no-members">No members</div>}
        {members.map(member => (
          <button
            key={member._id}
            className={`popover-member-avatar${selectedId === member._id ? ' selected' : ''}`}
            onClick={() => onSelect(member._id)}
            type="button"
            aria-label={member.fullname || member.firstName}
          >
            <UserAvatar
              src={member.imgUrl || member.profileImg}
              fullname={member.fullname || member.firstName}
              userId={member._id}
            />
          </button>
        ))}
      </div>
    </div>
  );
} 