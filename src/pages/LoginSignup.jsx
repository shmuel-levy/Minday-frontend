import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { userService } from '../services/user'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { uploadService } from '../services/upload.service'
import { login, signup } from '../store/user.actions'
import { socketService } from '../services/socket.service'
import mindayLogo from '../assets/img/minday-logo.png'
import { ProfileIcon } from '../cmps/svg/ProfileIcon'

export function LoginSignup() {
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        profileImg: ''
    })
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        submitCredentials(credentials)
    }

    function submitCredentials(credentials) {
        isSignup ? handleSignup(credentials) : handleLogin(credentials)
    }

    async function handleLogin(credentials) {
        try {
            const user = await login({ email: credentials.email, password: credentials.password })
            socketService.login(user._id)
            showSuccessMsg(`Welcome back, ${user.firstName || user.email}`)
            navigate('/board')
        } catch (err) {
            setErrorMsg(err.message || 'Could not login, try again later.')
            showErrorMsg(err.message || 'Could not login, try again later.')
        }
    }

    async function handleSignup(credentials) {
        try {
            const user = await signup({
                email: credentials.email,
                password: credentials.password,
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                profileImg: credentials.profileImg
            })
            showSuccessMsg(`Welcome, ${user.firstName || user.email}`)
            navigate('/board')
        } catch (err) {
            setErrorMsg(err.message || 'Could not sign-in, try again later.')
            showErrorMsg(err.message || 'Could not sign-in, try again later.')
        }
    }

    async function handleAddImage(ev) {
        try {
            const imgData = await uploadService.uploadImg(ev)
            setCredentials(prevCreds => ({ ...prevCreds, profileImg: imgData.url }))
        } catch (err) {
            console.log('Add profile image -> Has issues adding image', err)
            showErrorMsg('Could not upload your image')
        }
    }

    function getImage() {
        return credentials?.profileImg ? credentials.profileImg : null
    }

    return (
        <section className="login-page">
            <img src={mindayLogo} alt="Minday logo small" className="minday-logo-top-left" />
            <div className="main-container flex column ">
                <div className="form-container flex column align-center justify-center">
                    <div className="title-container flex">
                        <h1 className="main-title">Welcome to minday.com</h1>
                    </div>
                    <h3 className="secondary-title">
                        {`${
                            isSignup
                                ? "Get started - it's free. No credit card needed."
                                : 'Log in to your account'
                        }`}
                    </h3>
                    {errorMsg && <div className="login-error-msg">{errorMsg}</div>}

                    <form onSubmit={handleSubmit} className="login-form flex column align-center">
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            placeholder="Enter your email"
                            value={credentials.email || ''}
                            onChange={handleChange}
                            required
                            autoFocus
                            autoComplete="off"
                        />

                        {isSignup && (
                            <>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="login-input"
                                    placeholder="Enter your first name"
                                    value={credentials.firstName || ''}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    className="login-input"
                                    placeholder="Enter your last name"
                                    value={credentials.lastName || ''}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </>
                        )}

                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Enter your password"
                            value={credentials.password || ''}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />

                        {isSignup && (
                            <div className="img-input-container flex align-center">
                                <span>Add profile picture</span>

                                <label htmlFor="img" className="label-container">
                                    {getImage() ? (
                                        <img src={getImage()} alt="User profile" />
                                    ) : (
                                        <ProfileIcon style={{ width: 48, height: 48, color: '#b3d6f7' }} />
                                    )}
                                </label>

                                <input
                                    type="file"
                                    name="img"
                                    id="img"
                                    className="login-input"
                                    onChange={handleAddImage}
                                    hidden
                                />
                            </div>
                        )}

                        <button className="btn-login">{isSignup ? 'Sign up' : 'Login'}</button>
                    </form>
                </div>

                <p className="already-user flex ">
                    {`${isSignup ? 'Already have an account?' : "Don't have an account yet?"}`}
                    <span onClick={() => setIsSignup(!isSignup)}>{`${
                        isSignup ? 'Log in ' : 'Sign up'
                    }`}</span>
                </p>
            </div>

            <img src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png" alt="login page image" className="login-img"></img>
        </section>
    )
} 