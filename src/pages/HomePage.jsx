import { useEffect, useRef } from 'react'
import * as Ladda from 'ladda'
import 'ladda/dist/ladda.min.css'

import mindayLogo from '../../src/assets/img/minday-logo.png'
import { useNavigate } from 'react-router-dom'
import { HomeArrowIcon } from '../cmps/svg/HomeArrowIcon'

export function HomePage() {

    const navigate = useNavigate()
    const laddaRef = useRef(null)
    let laddaInstance = useRef(null)

    useEffect(() => {
        if (laddaRef.current) {
            laddaInstance.current = Ladda.create(laddaRef.current)
        }
    }, [])

    function handleGetStarted() {
        if (laddaInstance.current) {
            laddaInstance.current.start()
        }

        setTimeout(() => {
            if (laddaInstance.current) {
                laddaInstance.current.stop()
            }
            navigate('/board')
        }, 1000)
    }

    return (
        <section className="app-header-wraper">
            <div className="home-app-header">
                <img src={mindayLogo} alt="Minday Logo" className="logo-img" />
                <nav className="navbar">
                    <button className="login-btn">Log in</button>
                    <div className="get-started-wraper" onClick={handleGetStarted}>
                        <button
                            ref={laddaRef}
                            className="get-started-btn"
                            data-style="slide-right"
                        >
                            <span className="get-started">
                                <span>Get Started</span>
                                <span className="arrow-icon">
                                    <HomeArrowIcon />
                                </span>
                            </span>
                            <span className="ladda-spinner"></span>
                        </button>
                    </div>
                </nav>
            </div>
        </section>
    )
}