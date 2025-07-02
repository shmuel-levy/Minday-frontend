import React from 'react'

export function EmptyDashboard({ onAddWidget }) {
  return (
    <div className="dashboard-empty-state">
      <div className="empty-state-content">
        <img
          src="https://microfrontends.monday.com/mf-insights-widgets-core/latest/static/media/item_empty_state.b9d530c1.svg"
          alt="Empty state"
        />
        <div className="text-and-button-wrapper">
          <div className="text-content">
            <h3>Visualize your board data with multiple widgets</h3>
            <p>Use charts, timelines, and other widgets to get insights from this board</p>
          </div>
          <button
            type="button"
            className="button-primary"
            onClick={onAddWidget}
          >
            Add your first widget
          </button>
        </div>
      </div>
    </div>
  )
}
