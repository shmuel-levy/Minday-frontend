import React, { useState, useRef, useEffect } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { EmptyDashboard } from '../cmps/dashboard/EmptyDashboard';
import { StatusChart } from '../cmps/dashboard/StatusChart';
import { NumbersWidget } from '../cmps/dashboard/NumbersWidget';
import { StatusBattery } from '../cmps/dashboard/BatteryWidget';
import { FilesGalleryWidget } from '../cmps/dashboard/FilesGalleryWidget';
import { useBoardState } from '../customHooks/useBoardState';

const ReactGridLayout = WidthProvider(RGL);

export function Dashboard({ board, selectedWidget, onAddWidget }) {
  const { 
    dashboardWidgets, 
    setDashboardWidgets, 
    handleAddWidget, 
    handleUpdateWidgets, 
    handleRemoveWidget 
  } = useBoardState(board);
  
  const [selectedId, setSelectedId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [currentSelectedWidget, setCurrentSelectedWidget] = useState(selectedWidget);

  useEffect(() => {
    setCurrentSelectedWidget(selectedWidget);
  }, [selectedWidget]);

  useEffect(() => {
    if (currentSelectedWidget && !dashboardWidgets.find(w => w.title === currentSelectedWidget)) {
      handleAddWidget(currentSelectedWidget);
      setCurrentSelectedWidget(null);
    }
  }, [currentSelectedWidget, dashboardWidgets, handleAddWidget]);

  function onLayoutChange(layout) {
    try {
      const updatedWidgets = dashboardWidgets.map(widget => {
        const l = layout.find(item => item.i === widget.id);
        if (l) {
          // Ensure all values are valid numbers with strict validation
          const x = Number.isFinite(l.x) && l.x >= 0 ? Math.floor(l.x) : 0;
          const y = Number.isFinite(l.y) && l.y >= 0 ? Math.floor(l.y) : 0;
          const w = Number.isFinite(l.w) && l.w > 0 && l.w <= 12 ? Math.floor(l.w) : 4;
          const h = Number.isFinite(l.h) && l.h > 0 && l.h <= 20 ? Math.floor(l.h) : 4;
          
          return { ...widget, x, y, w, h };
        }
        return widget;
      });
      handleUpdateWidgets(updatedWidgets);
    } catch (error) {
      console.error('Error in onLayoutChange:', error);
      // If there's an error, reset to a safe state
      const safeWidgets = dashboardWidgets.map(widget => ({
        ...widget,
        x: 0,
        y: 0,
        w: 4,
        h: 4
      }));
      handleUpdateWidgets(safeWidgets);
    }
  }

  function handleDeleteWidget(widgetId) {
    handleRemoveWidget(widgetId);
    setMenuOpenId(null);
    if (selectedId === widgetId) setSelectedId(null);
  }

  function handleRenameWidget(widgetId) {
    const newTitle = prompt('Enter new widget title:');
    if (newTitle) {
      setDashboardWidgets(dashboardWidgets.map(w => w.id === widgetId ? { ...w, title: newTitle } : w));
    }
    setMenuOpenId(null);
  }

  function handleWidgetClick(e, widgetId) {
    // Don't select if clicking on drag handle or menu
    if (e.target.closest('.drag-btn') || e.target.closest('.menu-btn')) {
      return;
    }
    setSelectedId(widgetId);
  }

  if (dashboardWidgets.length === 0 && !currentSelectedWidget) {
    return <EmptyDashboard onAddWidget={(type) => setCurrentSelectedWidget(type)} />;
  }

  // Filter out any invalid widgets before rendering
  const validWidgets = dashboardWidgets.filter(widget => 
    widget && 
    widget.id && 
    Number.isFinite(widget.x) && 
    Number.isFinite(widget.y) && 
    Number.isFinite(widget.w) && widget.w > 0 && widget.w <= 12 &&
    Number.isFinite(widget.h) && widget.h > 0 && widget.h <= 20
  );

  const totalTasks = board?.groups?.reduce((acc, group) => acc + (group.tasks?.length || 0), 0);

  // Create a fallback board if none is provided
  const fallbackBoard = {
    _id: 'fallback-board',
    name: 'Fallback Board',
    groups: [
      {
        id: 'g_fallback',
        name: 'Default Group',
        tasks: [
          { 
            id: 't_1', 
            status: { label: 'Done' },
            title: 'Sample Task 1'
          },
          { 
            id: 't_2', 
            status: { label: 'Working on it' },
            title: 'Sample Task 2'
          },
          { 
            id: 't_3', 
            status: { label: 'Stuck' },
            title: 'Sample Task 3'
          },
          { 
            id: 't_4', 
            status: { label: 'Not started' },
            title: 'Sample Task 4'
          }
        ]
      }
    ]
  };

  const boardToUse = board || fallbackBoard;

  return (
    <div className="dashboard-container">
      <ReactGridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-btn"
        isDraggable={true}
        isResizable={true}
        margin={[10, 10]}
        containerPadding={[10, 10]}
        useCSSTransforms={true}
        preventCollision={false}
        compactType={null}
        onResizeStop={(layout, oldItem, newItem) => {
          console.log('Resize stopped:', { layout, oldItem, newItem });
        }}
      >
        {validWidgets.map(widget => {
          // Double-check widget data is valid before rendering
          const validWidget = {
            ...widget,
            x: Number.isFinite(widget.x) && widget.x >= 0 ? Math.floor(widget.x) : 0,
            y: Number.isFinite(widget.y) && widget.y >= 0 ? Math.floor(widget.y) : 0,
            w: Number.isFinite(widget.w) && widget.w > 0 && widget.w <= 12 ? Math.floor(widget.w) : 4,
            h: Number.isFinite(widget.h) && widget.h > 0 && widget.h <= 20 ? Math.floor(widget.h) : 4,
          };

          return (
            <div
              key={validWidget.id}
              data-grid={{ 
                i: validWidget.id, 
                x: validWidget.x, 
                y: validWidget.y, 
                w: validWidget.w, 
                h: validWidget.h 
              }}
              className={selectedId === validWidget.id ? 'selected' : ''}
              onClick={(e) => handleWidgetClick(e, validWidget.id)}
            >
              <div className={`widget-card${selectedId === validWidget.id ? ' selected' : ''}`}> 
                <div className="widget-card-header">
                  <span className="drag-btn" title="Drag">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <g fill="#676879">
                        <rect x="2" y="2" width="6" height="6" rx="2"/>
                        <rect x="12" y="2" width="6" height="6" rx="2"/>
                        <rect x="2" y="12" width="6" height="6" rx="2"/>
                        <rect x="12" y="12" width="6" height="6" rx="2"/>
                      </g>
                    </svg>
                  </span>
                  <h1 className="widget-card-title">{validWidget.title}</h1>
                  <button 
                    className="menu-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(validWidget.id);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <circle cx="4" cy="10" r="1.5" fill="#676879"/>
                      <circle cx="10" cy="10" r="1.5" fill="#676879"/>
                      <circle cx="16" cy="10" r="1.5" fill="#676879"/>
                    </svg>
                  </button>
                  {menuOpenId === validWidget.id && (
                    <div className="widget-menu">
                      <button onClick={() => handleRenameWidget(validWidget.id)}>Rename</button>
                      <button onClick={() => handleDeleteWidget(validWidget.id)}>Delete</button>
                    </div>
                  )}
                </div>
                <div className="widget-card-divider"></div>
                <div className="widget-content">
                  {validWidget.type === 'chart' && <StatusChart board={boardToUse} />}
                  {validWidget.type === 'numbers' && <NumbersWidget board={boardToUse} />}
                  {validWidget.type === 'battery' && <StatusBattery board={boardToUse} />}
                  {validWidget.type === 'files-gallery' && <FilesGalleryWidget board={boardToUse} />}
                </div>
              </div>
            </div>
          );
        })}
      </ReactGridLayout>
    </div>
  );
}