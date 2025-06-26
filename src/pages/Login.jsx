import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { userService } from '../services/user'
import { login } from '../store/user.actions'

export function Login() {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
        } catch (err) {
            console.log('Could not load users:', err)
        }
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.email) return
        await login(credentials)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (
        <form className="login-form" onSubmit={onLogin}>
            <input
                type="email"
                name="email"
                value={credentials.email}
                placeholder="Email"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button>Login</button>
            
            {users.length > 0 && (
                <div>
                    <p>Or select existing user:</p>
                    <select
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}>
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user._id} value={user.email}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </form>
    )
}