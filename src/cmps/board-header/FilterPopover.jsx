import { useEffect, useRef, useState } from 'react';

export function FilterPopover({
  isOpen,
  onClose,
  onApplyFilters,
  anchorRef,
  board
}) {
  const popoverRef = useRef();
  const [filters, setFilters] = useState([{
    id: Date.now(),
    field: '',
    condition: '',
    value: ''
  }]);

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
    timeline: {
      label: 'Timeline',
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

  useEffect(() => {
    if (isOpen && filters.length === 0) {
      setFilters([{
        id: Date.now(),
        field: '',
        condition: '',
        value: ''
      }]);
    }
  }, [isOpen, filters.length]);

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
    setFilters(prev => {
      const newFilters = prev.map(f => {
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
      });
      
      // Apply filters immediately when user makes changes
      const validFilters = newFilters.filter(f => f.field && f.condition);
      onApplyFilters(validFilters);
      
      return newFilters;
    });
  }

  function clearAllFilters() {
    setFilters([{
      id: Date.now(),
      field: '',
      condition: '',
      value: ''
    }]);
    onApplyFilters([]);
  }

  function applyFilters() {
    const validFilters = filters.filter(f => f.field && f.condition);
    onApplyFilters(validFilters);
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

  function renderFilterRow(filter) {
    const fieldConfig = FIELD_CONFIGS[filter.field];
    const conditions = fieldConfig?.conditions || [];

    return (
      <div key={filter.id} className="filter-row-container">
          <div className="filter-where-label">
      {filters[0].id === filter.id && (
      <span>Where</span>
      )}
      </div>
        <div className="filter-row">
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
      </div>
    );
  }

  if (!isOpen) return null

  return (
    <div className="filter-popover" ref={popoverRef}>
      <div className="filter-popover-header">
        <div className="filter-popover-title-container">
          <span className='title'>Advanced filters</span>
          <span className='subTitle'>Showing all of 7 items</span>
        </div>
        <div className="filter-popover-actions">
          <button 
            className="filter-popover-clear-all" 
            onClick={clearAllFilters}
            type="button"
          >
            Clear all
          </button>
        </div>
      </div>
      
      <div className="filter-popover-content">
       
        
        {filters.map(renderFilterRow)}
        
        {filters.length > 0 && (
          <button className="filter-add-more" onClick={addFilter}>
            + New filter
          </button>
        )}
      </div>
    </div>
  )
} 