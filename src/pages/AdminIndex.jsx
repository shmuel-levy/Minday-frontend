import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadUsers, removeUser } from '../store/user.actions'

export function AdminIndex() {
    const users = useSelector(storeState => storeState.userModule.users)
    const isLoading = useSelector(storeState => storeState.userModule.isLoading)

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <section className="admin">
            <h2>Admin Dashboard</h2>
            {isLoading && 'Loading users...'}
            {users && (
                <ul>
                    {users.map(user => (
                        <li className='user' key={user._id}>
                            <div className="user-info">
                                <h4>{user.fullname}</h4>
                                <p>Email: {user.username}</p>
                                <p>Role: {user.isAdmin ? 'Admin' : 'User'}</p>
                                <p>Boards Created: {user.boardsCreated || 0}</p>
                            </div>
                            <button
                                onClick={() => {
                                    removeUser(user._id)
                                }}
                            >
                                Remove {user.fullname}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}