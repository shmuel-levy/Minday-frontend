import { useEffect, useRef } from 'react'

export function AddWidgetModal({ isOpen, onClose, onAddWidget, anchorRef }) {
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
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
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

  function handleWidgetClick(widget) {
    console.log('AddWidgetModal - handleWidgetClick called with:', widget.title)
    console.log('AddWidgetModal - onAddWidget function:', onAddWidget)
    onAddWidget(widget.title)
    onClose()
  }

  return (
    <div 
      ref={modalRef}
      className="widget-modal">
      <div className="widgets-list" >
        {widgets.map((widget) => (
          <button
            key={widget.id}
            className="widget-item"
            onClick={() => handleWidgetClick(widget)}
          >
            <img src={widget.image} alt={widget.title} />
            <div>
              <div className='widget-title'>{widget.title}</div>
              <div className='widget-description'>{widget.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}