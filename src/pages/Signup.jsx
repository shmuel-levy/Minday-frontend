import { useState } from 'react'
import { useNavigate } from 'react-router'

import { signup } from '../store/user.actions'

import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user'

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    function clearState() {
        setCredentials(userService.getEmptyUser())
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.email || !credentials.password || !credentials.firstName) return
        await signup(credentials)
        clearState()
        navigate('/')
    }

    function onUploaded(imgUrl) {
        setCredentials(credentials => ({ ...credentials, profileImg: imgUrl }))
    }

    return (
        <form className="signup-form" onSubmit={onSignup}>
            <input
                type="text"
                name="firstName"
                value={credentials.firstName}
                placeholder="First Name"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lastName"
                value={credentials.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                required
            />
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
            <select
                name="role"
                value={credentials.role}
                onChange={handleChange}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <ImgUploader onUploaded={onUploaded} />
            <button>Signup</button>
        </form>
    )
}