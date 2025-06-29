import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
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

  let style = {};

  if (anchorRef && anchorRef.current) {
    const rect = anchorRef.current.getBoundingClientRect();
    const popoverWidth = 260;
    const left = rect.left + window.scrollX + (rect.width / 2) - (popoverWidth / 2);
    const top = rect.bottom + window.scrollY + 8;
    const adjustedLeft = Math.max(8, left);
    const rightEdge = adjustedLeft + popoverWidth;
    const viewportWidth = window.innerWidth;
    const finalLeft = rightEdge > viewportWidth - 8 ? viewportWidth - popoverWidth - 8 : adjustedLeft;
    style = {
      ...style,
      top: top,
      left: finalLeft,
    };
  } else {
    style = { ...style, top: 100, left: 100 };
  }

  return ReactDOM.createPortal(
    <div className="person-filter-popover" ref={popoverRef} style={style}>
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
    </div>,
    document.body
  );
} 