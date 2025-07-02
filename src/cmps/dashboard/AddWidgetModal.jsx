import { useEffect, useRef } from 'react'

export function AddWidgetModal({ isOpen, onClose, onSelectWidget, anchorRef }) {
  const modalRef = useRef()

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose()
      }
    }

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose, anchorRef])

  if (!isOpen) return null

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
  ]

  const handleWidgetClick = (widget) => {
    onSelectWidget(widget.id)
    onClose()
  }

  return (
    <div 
      ref={modalRef}
      className="widget-modal"
      style={{
        position: 'absolute',
        top: anchorRef?.current ? anchorRef.current.getBoundingClientRect().bottom + window.scrollY + 4 : '100px',
        left: anchorRef?.current ? anchorRef.current.getBoundingClientRect().left + window.scrollX : '100px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        zIndex: 1051
      }}
    >
      <div className="widgets-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="widget-item"
            onClick={() => handleWidgetClick(widget)}
            style={{ display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <img src={widget.image} alt={widget.title} style={{ width: '40px', height: '40px' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>{widget.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#555' }}>{widget.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}