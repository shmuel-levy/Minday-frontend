import { useEffect, useRef, useState } from 'react';

export function FilterPopover({
  isOpen,
  onClose,
  onApplyFilters,
  anchorRef,
  board
}) {
  const popoverRef = useRef();
  const [filters, setFilters] = useState([]);

  const BASE_CONDITIONS = [
    { key: 'is', label: 'is', requiresValue: true },
    { key: 'is_not', label: 'is not', requiresValue: true }
  ];

  const EMPTY_CONDITIONS = [
    { key: 'is_empty', label: 'is empty', requiresValue: false },
    { key: 'is_not_empty', label: 'is not empty', requiresValue: false }
  ];

  const PERSON_SPECIAL_CONDITIONS = [
    { key: 'is_assigned', label: 'is assigned', requiresValue: false },
    { key: 'is_not_assigned', label: 'is not assigned', requiresValue: false }
  ];

  const TIME_CONDITIONS = [
    { key: 'ends_on', label: 'ends on', requiresValue: true },
    { key: 'ends_after', label: 'ends after', requiresValue: true },
    { key: 'ends_on_or_after', label: 'ends on or after', requiresValue: true },
    { key: 'ends_before', label: 'ends before', requiresValue: true },
    { key: 'ends_on_or_before', label: 'ends on or before', requiresValue: true },
    { key: 'starts_on', label: 'starts on', requiresValue: true },
    { key: 'starts_after', label: 'starts after', requiresValue: true },
    { key: 'starts_on_or_after', label: 'starts on or after', requiresValue: true },
    { key: 'starts_before', label: 'starts before', requiresValue: true },
    { key: 'is_before', label: 'is before', requiresValue: true },
    { key: 'is_after', label: 'is after', requiresValue: true },
    { key: 'is_on_or_before', label: 'is on or before', requiresValue: true },
    { key: 'is_on_or_after', label: 'is on or after', requiresValue: true }
  ];

  const DATE_VALUES = [
    { key: 'today', label: 'Today' },
    { key: 'tomorrow', label: 'Tomorrow' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'this_week', label: 'This week' },
    { key: 'last_week', label: 'Last week' },
    { key: 'next_week', label: 'Next week' },
    { key: 'this_month', label: 'This month' },
    { key: 'last_month', label: 'Last month' },
    { key: 'next_month', label: 'Next month' },
    { key: 'past_date', label: 'Past date' },
    { key: 'future_date', label: 'Future date' }
  ];

  const FIELD_CONFIGS = {
    group: {
      label: 'Group',
      conditions: BASE_CONDITIONS,
      getValues: (board) => board?.groups?.map(group => ({
        key: group.id,
        label: group.title
      })) || []
    },
    name: {
      label: 'Name',
      conditions: BASE_CONDITIONS,
      getValues: (board) => {
        const taskNames = new Set();
        board?.groups?.forEach(group => {
          group.tasks?.forEach(task => {
            if (task.title) taskNames.add(task.title);
          });
        });
        return Array.from(taskNames).map(name => ({ key: name, label: name }));
      }
    },
    person: {
      label: 'Person',
      conditions: [...BASE_CONDITIONS, ...PERSON_SPECIAL_CONDITIONS],
      getValues: (board) => {
        const members = new Set();
        
        board?.members?.forEach(member => {
          if (member._id) {
            members.add({
              key: member._id,
              label: member.fullname || member.firstName
            });
          }
        });
        
        board?.groups?.forEach(group => {
          group.tasks?.forEach(task => {
            if (task.assignee) {
              members.add({
                key: task.assignee,
                label: task.assignee
              });
            }
          });
        });
        
        return Array.from(members);
      }
    },
    status: {
      label: 'Status',
      conditions: [...BASE_CONDITIONS, ...EMPTY_CONDITIONS],
      getValues: (board) => {
        const statuses = new Set();
        board?.groups?.forEach(group => {
          group.tasks?.forEach(task => {
            if (task.status) statuses.add(task.status);
          });
        });
        return Array.from(statuses).map(status => ({ key: status, label: status }));
      }
    },
    priority: {
      label: 'Priority',
      conditions: [...BASE_CONDITIONS, ...EMPTY_CONDITIONS],
      staticValues: [
        { key: 'critical', label: 'Critical' },
        { key: 'high', label: 'High' },
        { key: 'medium', label: 'Medium' },
        { key: 'low', label: 'Low' }
      ]
    },
    files: {
      label: 'Files',
      conditions: EMPTY_CONDITIONS
    },
    timeline_start: {
      label: 'Timeline Start',
      conditions: [...BASE_CONDITIONS, ...EMPTY_CONDITIONS, ...TIME_CONDITIONS],
      staticValues: DATE_VALUES
    },
    timeline_end: {
      label: 'Timeline End',
      conditions: [...BASE_CONDITIONS, ...EMPTY_CONDITIONS, ...TIME_CONDITIONS],
      staticValues: DATE_VALUES
    },
    date: {
      label: 'Date',
      conditions: [...BASE_CONDITIONS, ...EMPTY_CONDITIONS, ...TIME_CONDITIONS],
      staticValues: DATE_VALUES
    }
  };

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

  function addFilter() {
    setFilters(prev => [...prev, {
      id: Date.now(),
      field: '',
      condition: '',
      value: ''
    }]);
  }

  function removeFilter(filterId) {
    setFilters(prev => prev.filter(f => f.id !== filterId));
  }

  function updateFilter(filterId, field, value) {
    setFilters(prev => prev.map(f => {
      if (f.id === filterId) {
        if (field === 'field') {
          return { ...f, field: value, condition: '', value: '' };
        } else if (field === 'condition') {
          return { ...f, condition: value, value: '' };
        } else {
          return { ...f, [field]: value };
        }
      }
      return f;
    }));
  }

  function clearAllFilters() {
    setFilters([]);
  }

  function applyFilters() {
    const validFilters = filters.filter(f => f.field && f.condition);
    onApplyFilters(validFilters);
    onClose();
  }

  function getValueOptions(field) {
    const fieldConfig = FIELD_CONFIGS[field];
    if (!fieldConfig) return [];

    if (fieldConfig.staticValues) {
      return fieldConfig.staticValues;
    }
    
    if (fieldConfig.getValues) {
      return fieldConfig.getValues(board);
    }
    
    return [];
  }

  function isValueDisabled(field, condition) {
    if (!field || !condition) return true;
    const fieldConfig = FIELD_CONFIGS[field];
    const conditionOption = fieldConfig?.conditions?.find(c => c.key === condition);
    return !conditionOption?.requiresValue;
  }

  function getPopoverStyle() {
    const baseStyle = {
      position: 'fixed',
      zIndex: 10000,
      minWidth: 600,
      maxWidth: 700,
    };

    if (!anchorRef?.current) {
      return { ...baseStyle, top: 100, left: 100 };
    }

    const rect = anchorRef.current.getBoundingClientRect();
    const popoverWidth = 600;
    const popoverHeight = 400; // Estimated height
    
    // Calculate position
    let left = rect.left + window.scrollX + (rect.width / 2) - (popoverWidth / 2);
    let top = rect.bottom + window.scrollY + 8;
    
    // Check if popover would go off the right edge
    const rightEdge = left + popoverWidth;
    const viewportWidth = window.innerWidth;
    if (rightEdge > viewportWidth - 8) {
      left = viewportWidth - popoverWidth - 8;
    }
    
    // Check if popover would go off the left edge
    if (left < 8) {
      left = 8;
    }
    
    // Check if popover would go off the bottom edge
    const bottomEdge = top + popoverHeight;
    const viewportHeight = window.innerHeight;
    if (bottomEdge > viewportHeight - 8) {
      // Show above the button instead
      top = rect.top + window.scrollY - popoverHeight - 8;
    }
    
    // Ensure top is not negative
    if (top < 8) {
      top = 8;
    }

    return {
      ...baseStyle,
      top: top,
      left: left,
      width: popoverWidth,
    };
  }

  function renderFilterRow(filter) {
    const fieldConfig = FIELD_CONFIGS[filter.field];
    const conditions = fieldConfig?.conditions || [];

    return (
      <div key={filter.id} className="filter-row">
        <div className="filter-field-selector">
          <select
            value={filter.field}
            onChange={(e) => updateFilter(filter.id, 'field', e.target.value)}
            className="filter-select"
          >
            <option value="">column</option>
            {Object.entries(FIELD_CONFIGS).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-condition-selector">
          <select
            value={filter.condition}
            onChange={(e) => updateFilter(filter.id, 'condition', e.target.value)}
            className="filter-select"
            disabled={!filter.field}
          >
            <option value="">condition</option>
            {conditions.map(option => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-value-selector">
          <select
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
            className="filter-select"
            disabled={isValueDisabled(filter.field, filter.condition)}
          >
            <option value="">value</option>
            {!isValueDisabled(filter.field, filter.condition) && 
              getValueOptions(filter.field).map(option => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))
            }
          </select>
        </div>
        
        <button
          className="filter-remove-btn"
          onClick={() => removeFilter(filter.id)}
          type="button"
        >
          ×
        </button>
      </div>
    );
  }

  if (!isOpen) return null

  return (
    <div className="filter-popover" ref={popoverRef} style={getPopoverStyle()}>
      <div className="filter-popover-header">
        <div className="filter-popover-title">
          <span>Advanced filters</span>
        </div>
        <button 
          className="filter-popover-clear-all" 
          onClick={clearAllFilters}
          type="button"
        >
          Clear all
        </button>
      </div>
      
      <div className="filter-popover-content">
        <div className="filter-where-label">Where:</div>
        
        {filters.length === 0 && (
          <div className="filter-empty-state">
            <button className="filter-add-first" onClick={addFilter}>
              + Add filter
            </button>
          </div>
        )}
        
        {filters.map(renderFilterRow)}
        
        {filters.length > 0 && (
          <button className="filter-add-more" onClick={addFilter}>
            + Add another filter
          </button>
        )}
      </div>
      
      <div className="filter-popover-footer">
        <button 
          className="filter-apply-btn" 
          onClick={applyFilters}
          disabled={filters.length === 0}
          type="button"
        >
          Apply filters
        </button>
      </div>
    </div>
  )
} 