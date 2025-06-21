import React from 'react';
export function BoardDashboard({ board, onAddWidget }) {
    return (
        <div className="dashboard-empty-state">
            <div className="empty-state-content">
                <img 
                    src="https://microfrontends.monday.com/mf-insights-widgets-core/latest/static/media/item_empty_state.b9d530c1.svg" 
                    alt="" 
                />
                <div className="text-and-button-wrapper">
                    <div className="text-content">
                        <h3 
                            data-testid="text" 
                            className="typography_7b15ca8c28 primary_ef9ec71c10 start_5d039bf1e8 singleLineEllipsis_8d54649bae heading_993ceba687 h3Bold_e03c7db845"
                        >
                            Visualize your board data with multiple widgets
                        </h3>
                        <div 
                            data-testid="text" 
                            className="typography_7b15ca8c28 primary_ef9ec71c10 start_5d039bf1e8 singleLineEllipsis_8d54649bae text_0f26922101 text2Normal_b334bbf839"
                        >
                            Use charts, timelines, and other widgets to get insights from this board
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className="button_2d2dd0c864 sizeMedium_94c28bb002 kindPrimary_75bc90cd00 colorPrimary_3e4dab8c9f" 
                        data-testid="button" 
                        aria-disabled="false" 
                        aria-busy="false"
                        onClick={onAddWidget}
                    >
                        Add your first widget
                    </button>
                </div>
            </div>
        </div>
    );
}