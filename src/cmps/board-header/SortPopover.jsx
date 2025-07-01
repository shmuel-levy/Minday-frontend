import { useEffect, useRef, useState } from 'react';

export function SortPopover({
  isOpen,
  onClose,
  selectedField,
  onSelectField,
  sortDirection,
  onSelectDirection,
  onClear,
  anchorRef,
}) {
  const popoverRef = useRef()
  const [localField, setLocalField] = useState(selectedField || '');
  const [localDirection, setLocalDirection] = useState(sortDirection || 'asc');

  const SORT_FIELDS = [
    { key: 'title', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'assignee', label: 'Person' },
    { key: 'dueDate', label: 'Date' },
    { key: 'timeline', label: 'Timeline' },
    { key: 'members', label: 'Members' },
    { key: 'files', label: 'Files' }
  ];
  
  const SORT_DIRECTIONS = [
    { key: 'asc', label: 'Ascending' },
    { key: 'desc', label: 'Descending' },
  ];

  useEffect(() => {
    setLocalField(selectedField || '');
    setLocalDirection(sortDirection || 'asc');
  }, [selectedField, sortDirection, isOpen]);

  useEffect(() => {
    if (localField && localDirection) {
      if (localField !== selectedField) onSelectField(localField);
      if (localDirection !== sortDirection) onSelectDirection(localDirection);
    }
  }, [localField, localDirection]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        (!anchorRef || !anchorRef.current || !anchorRef.current.contains(e.target))
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div className="sort-popover" ref={popoverRef}>
      <div className="sort-popover-header">
        <div className="sort-popover-title">
          <span>Sort by</span>
          <span className="sort-popover-help" title="Sort your board by any column">?</span>
        </div>
      </div>
      <div className="sort-popover-dropdowns">
        <div className="sort-popover-dropdown sort-popover-field-dropdown">
          <select
            className="sort-popover-select"
            value={localField}
            onChange={e => setLocalField(e.target.value)}
          >
            <option value="">Choose column</option>
            {SORT_FIELDS.map(field => (
              <option key={field.key} value={field.key}>{field.label}</option>
            ))}
          </select>
        </div>
        <div className="sort-popover-dropdown sort-popover-direction-dropdown">
          <select
            className="sort-popover-select"
            value={localDirection}
            onChange={e => setLocalDirection(e.target.value)}
          >
            {SORT_DIRECTIONS.map(dir => (
              <option key={dir.key} value={dir.key}>{dir.label}</option>
            ))}
          </select>
        </div>
        <button className="sort-popover-clear" onClick={(e) => {onClear(e);}} title="Clear all" type="button">×</button>
      </div>
    </div>
  );
} 