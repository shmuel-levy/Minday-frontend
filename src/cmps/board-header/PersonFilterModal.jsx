import { Modal } from '../Modal';

export function PersonFilterModal({ isOpen, onClose, members = [], selected = [], onSelect, onClear }) {
  console.log('isPersonModalOpen', isOpen, members);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter by Person" className="person-filter-modal">
      <div className="person-filter-list">
        {members.map(member => (
          <button
            key={member._id}
            className={`person-filter-item${selected.includes(member._id) ? ' selected' : ''}`}
            onClick={() => onSelect(member._id)}
            type="button"
          >
            <img src={member.profileImg} alt={member.fullName || member.firstName} className="person-avatar" />
            <span className="person-name">{member.fullName || member.firstName}</span>
            {selected.includes(member._id) && <span className="selected-indicator">✔</span>}
          </button>
        ))}
      </div>
      <button className="clear-all-btn" onClick={onClear}>Clear All</button>
    </Modal>
  );
} 