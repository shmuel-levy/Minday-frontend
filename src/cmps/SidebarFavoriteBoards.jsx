import { useState } from 'react'
import { FavoriteToggleIcon } from './icons/FavoriteToggleIcon'
import { ArrowDownUpIcon } from './svg/ArrowDownUpIcon' 

export function SidebarFavoriteBoards({ boards }) {
  const [isOpen, setIsOpen] = useState(true)

  const favoriteBoards = [] 
  return (
    <section className="sidebar-favorites">
      <div className={`section-header ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <FavoriteToggleIcon defaultIsFavorite={favoriteBoards.length > 0} />
        <span className="title">Favorites</span>
        <span className="chevron">
<ArrowDownUpIcon direction={isOpen ? 'up' : 'down'} />

        </span>
      </div>

      {isOpen && (
        <div className="favorites-content">

          {favoriteBoards.length === 0 ? (
            <div className="empty-msg">
              <p className="bold">Your favorites are empty</p>
              <p>Add your boards, docs, or dashboards for a quick access.</p>
            </div>
          ) : (
            <ul>
              {favoriteBoards.map(board => (
                <li key={board._id}>{board.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <hr className="divider" />
    </section>
  )
}