import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    if (!board || !board._id) return null
    
    return (
        <article className="preview">
            <header>
                <Link to={`/board/${board._id}`}>{board.title}</Link>
                {board.isStarred && <span className="star">⭐</span>}
            </header>

            <p>Description: <span>{board.description}</span></p>
            <p>Tasks: <span>{board.groups?.reduce((acc, group) => acc + group.tasks.length, 0) || 0}</span></p>
            <p>Members: <span>{board.members?.length || 0}</span></p>
            {board.createdBy && <p>Created by: <Link to={`/user/${board.createdBy._id}`}>{board.createdBy.fullname}</Link></p>}

        </article>
    )
}