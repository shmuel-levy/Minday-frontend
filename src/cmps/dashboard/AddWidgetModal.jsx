import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export function AddWidgetModal({ isOpen, onClose, onSelectWidget, buttonRef }) {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen && buttonRef?.current && modalRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const modalRect = modalRef.current.getBoundingClientRect();
        
        let top = buttonRect.bottom + window.scrollY + 8;
        let left = buttonRect.left + window.scrollX;

        if (left + modalRect.width > window.innerWidth) {
            left = window.innerWidth - modalRect.width - 8;
        }

        if (top + modalRect.height > window.innerHeight) {
            top = buttonRect.top + window.scrollY - modalRect.height - 8;
        }
        
        modalRef.current.style.top = `${top}px`;
        modalRef.current.style.left = `${left}px`;
    }

    const handleInteraction = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        onClose();
      }
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleInteraction);
      document.addEventListener('keydown', handleInteraction);
    }

    return () => {
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [isOpen, buttonRef, onClose]);

  if (!isOpen) return null;

  const widgets = [
    {
      id: 'chart',
      title: 'Chart',
      description: 'Create chart widget to visually show data from your boards',
      image: 'https://cdn.monday.com/images/column-store/overview-sections/ChartOverviewSection_1-icon-small.png'
    },
    {
      id: 'numbers',
      title: 'Numbers',
      description: 'Get a quick view on all number columns',
      image: 'https://cdn.monday.com/images/column-store/overview-sections/CounterOverviewSection_5-icon-small.png'
    },
    {
      id: 'battery',
      title: 'Battery',
      description: 'Your progress at a glance',
      image: 'https://cdn.monday.com/images/column-store/overview-sections/BatteryOverviewSection_3-icon-small.png'
    },
    {
      id: 'gantt',
      title: 'Gantt',
      description: 'Plan, track and present your projects visually using the Gantt chart',
      image: 'https://cdn.monday.com/images/column-store/overview-sections/TimelineGanttOverviewSection_1-icon-small.png'
    },
    {
      id: 'files',
      title: 'Files Gallery',
      description: 'Manage and collaborate on your files with your team',
      image: 'https://cdn.monday.com/images/column-store/overview-sections/FilesGalleryOverviewSection-icon-small.png'
    }
  ];

  const handleWidgetClick = (widget) => {
    onSelectWidget(widget);
    onClose();
  };

  return ReactDOM.createPortal(
    <div 
        ref={modalRef}
        tabIndex="-1" 
        className="ds-dialog-content-wrapper add-section-button" 
        role="dialog" 
        style={{ position: 'absolute' }}
    >
        <div className="ds-dialog-content-component bottom edge-bottom opacity-and-slide-enter-done">
            <div className="select-section-type-dialog">
                <div className="overview-section-store">
                    <div className="overview-section-type-menu-section">
                        {widgets.map((widget) => (
                            <div 
                                key={widget.id}
                                className="overview-section-item"
                                onClick={() => handleWidgetClick(widget)}
                            >
                                <div className="preview">
                                    <img 
                                        className="overview-section-image" 
                                        src={widget.image}
                                        alt={widget.title}
                                    />
                                </div>
                                <div className="title-wrapper">
                                    <div className="title-and-icon-wrapper">
                                        <div>
                                            <span className="title">{widget.title}</span>
                                        </div>
                                    </div>
                                    <div className="description">
                                        <div className="multiline-ellipsis-component">
                                            {widget.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
      
                    <div className="overview-section-type-menu-section">
                        <div className="overview-section-item">
                            <div className="preview">
                                <img 
                                    className="overview-section-image" 
                                    src="https://cdn.monday.com/images/column-store/overview-sections/OverviewSectionApps-icon_1-dark.png"
                                    alt="Apps"
                                />
                            </div>
                            <div className="title-wrapper">
                                <div className="title-and-icon-wrapper">
                                    <div>
                                        <span className="title">Apps</span>
                                    </div>
                                </div>
                                <div className="description">
                                    <div className="multiline-ellipsis-component">
                                        Enhance your dashboard with widgets built on the monday apps framework
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="overview-section-type-menu-section">
                        <div className="overview-section-item more-widgets-menu-item" data-testid="more-widgets-menu-item">
                            More widgets
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>,
    document.body
  );
}