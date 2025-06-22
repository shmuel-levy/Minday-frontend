import mindayLogo from '../../src/assets/img/minday-logo.png'
import { useNavigate } from 'react-router-dom'
export function HomePage() {

    const navigate = useNavigate()

    function handleGetStarted() {
        navigate('/board')
    }
    return (
        <section className="app-header-wraper">
            <div className="home-app-header">
                <img src={mindayLogo} alt="Minday Logo" className="logo-img"
                />
                <nav className="navbar">
                    <button className="login-btn">Login</button>
                    <div className="get-started" onClick={handleGetStarted}>Get Started </div>
                </nav>
            </div>

        </section>
    )
}