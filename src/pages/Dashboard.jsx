import React, { useState, useEffect } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { EmptyDashboard } from '../cmps/dashboard/EmptyDashboard';
import { StatusChart } from '../cmps/dashboard/StatusChart';
import { NumbersWidget } from '../cmps/dashboard/NumbersWidget';
import { StatusBattery } from '../cmps/dashboard/BatteryWidget';

const ReactGridLayout = WidthProvider(RGL);

export function Dashboard({ board, selectedWidget, onAddWidget }) {
  const [widgets, setWidgets] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest('.widget-card')) setSelectedId(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function addWidget(type) {
    const newWidget = {
      id: 'w' + Date.now(),
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      x: (widgets.length * 2) % 12,
      y: Infinity,
      w: 4,
      h: 4,
    };
    setWidgets([...widgets, newWidget]);
  }

  function onLayoutChange(layout) {
    const updatedWidgets = widgets.map(widget => {
      const l = layout.find(item => item.i === widget.id);
      return l ? { ...widget, x: l.x, y: l.y, w: l.w, h: l.h } : widget;
    });
    setWidgets(updatedWidgets);
  }

  function handleDeleteWidget(widgetId) {
    setWidgets((prevWidgets) => {
      const updated = prevWidgets.filter(w => w.id !== widgetId);
      if (updated.length === 0) {
        setMenuOpenId(null);
        setSelectedId(null);
      }
      return updated;
    });
  }

  function handleRenameWidget(widgetId) {
    const newTitle = prompt('Enter new widget title:');
    if (newTitle) {
      setWidgets(widgets.map(w => w.id === widgetId ? { ...w, title: newTitle } : w));
    }
    setMenuOpenId(null);
  }

  if (widgets.length === 0 && !selectedWidget) {
    return <EmptyDashboard onAddWidget={onAddWidget} />;
  }

  if (selectedWidget && !widgets.find(w => w.type === selectedWidget)) {
    addWidget(selectedWidget);
  }

  const totalTasks = board?.groups?.reduce((acc, group) => acc + (group.tasks?.length || 0), 0);

  return (
    <div className="dashboard-container">
      <ReactGridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-btn"
        isResizable={true}
        isBounded={true}
        preventCollision={true}
      >
        {widgets.map(widget => (
          <div
            key={widget.id}
            data-grid={{
              i: widget.id,
              x: widget.x,
              y: widget.y,
              w: widget.w,
              h: widget.h,
              minW: 3,
              minH: 3,
              maxW: 8,
              maxH: 10,
            }}
            className={selectedId === widget.id ? 'selected' : ''}
            onClick={e => {
              if (!e.target.closest('.drag-btn') && !e.target.closest('.menu-btn')) {
                setSelectedId(widget.id);
              }
            }}
          >
            <div className={`widget-card${selectedId === widget.id ? ' selected' : ''}`}> 
              <div className="widget-card-header">
                <span className="drag-btn" title="Drag">
                  <svg width="20" height="20" viewBox="0 0 20 20"><g fill="#676879"><rect x="2" y="2" width="6" height="6" rx="2"/><rect x="12" y="2" width="6" height="6" rx="2"/><rect x="2" y="12" width="6" height="6" rx="2"/><rect x="12" y="12" width="6" height="6" rx="2"/></g></svg>
                </span>
                <h1 className="widget-card-title">{widget.title}</h1>
                <button className="menu-btn" onClick={() => setMenuOpenId(widget.id)}>
                  <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="4" cy="10" r="1.5" fill="#676879"/><circle cx="10" cy="10" r="1.5" fill="#676879"/><circle cx="16" cy="10" r="1.5" fill="#676879"/></svg>
                </button>
                {menuOpenId === widget.id && (
                  <div className="widget-menu">
                    <button onClick={() => handleRenameWidget(widget.id)}>Rename</button>
                    <button onClick={() => handleDeleteWidget(widget.id)}>Delete</button>
                  </div>
                )}
              </div>
              <div className="widget-card-divider"></div>
              <div className="widget-content">
                {widget.type === 'chart' && <StatusChart board={board} />}
                {widget.type === 'numbers' && (<NumbersWidget title="Total Tasks" value={totalTasks} />)}
                {widget.type === 'battery' && (<StatusBattery board={board} />)}
              </div>
            </div>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}