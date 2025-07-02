import { Modal } from '../Modal';

function getAllBoardPersons(board) {
  const membersMap = new Map();
  board?.members?.forEach(member => {
    if (member._id) {
      membersMap.set(member._id, {
        _id: member._id,
        fullname: member.fullname || member.firstName,
        profileImg: member.profileImg || member.imgUrl,
      });
    }
  });
  board?.groups?.forEach(group => {
    group.tasks?.forEach(task => {
      if (task.assignee && !membersMap.has(task.assignee)) {
        membersMap.set(task.assignee, {
          _id: task.assignee,
          fullname: task.assignee,
        });
      }
      if (Array.isArray(task.members)) {
        task.members.forEach(m => {
          if (typeof m === 'string' && !membersMap.has(m)) {
            membersMap.set(m, { _id: m, fullname: m });
          } else if (m && m._id && !membersMap.has(m._id)) {
            membersMap.set(m._id, { _id: m._id, fullname: m.fullname || m.firstName || m._id, profileImg: m.profileImg || m.imgUrl });
          }
        });
      }
    });
  });
  return Array.from(membersMap.values());
}

export function PersonFilterModal({ isOpen, onClose, board, selected = [], onSelect, onClear }) {
  const members = getAllBoardPersons(board);

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
            <img src={member.profileImg} alt={member.fullname} className="person-avatar" />
            <span className="person-name">{member.fullname}</span>
            {selected.includes(member._id) && <span className="selected-indicator">✔</span>}
          </button>
        ))}
      </div>
      <button className="clear-all-btn" onClick={onClear}>Clear All</button>
    </Modal>
  )
} 