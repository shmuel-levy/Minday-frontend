import { useEffect, useRef } from 'react'
import * as Ladda from 'ladda'
import 'ladda/dist/ladda.min.css'

import logo from '../../src/assets/img/minday-logo-home.png'
import mindayLogo from '../../src/assets/img/minday-logo.png'
import { useNavigate } from 'react-router-dom'

import { HomeArrowIcon } from '../cmps/svg/HomeArrowIcon'
import { CrmIcon } from '../cmps/svg/Homepage/CrmIcon'
import { SoftwareIcon } from '../cmps/svg/Homepage/SoftwareIcon'
import { ITIcon } from '../cmps/svg/Homepage/ITIcon'
import { OperationsIcon } from '../cmps/svg/Homepage/OperationsIcon'
import { ProductIcon } from '../cmps/svg/Homepage/ProductIcon'
import { DesignIcon } from '../cmps/svg/Homepage/DesignIcon'
import { MarketingIcon } from '../cmps/svg/Homepage/MarketingIcon'
import { TasksIcon } from '../cmps/svg/Homepage/TasksIcon'
import { ProjectsIcon } from '../cmps/svg/Homepage/ProjectsIcon'

export function HomePage() {

    const navigate = useNavigate()

    const laddaHeaderRef = useRef(null)
    const laddaHeroRef = useRef(null)
    const laddaSelectorsRef = useRef(null)

    const headerLaddaInstance = useRef(null)
    const heroLaddaInstance = useRef(null)
    const selectorsLaddaInstance = useRef(null)


    useEffect(() => {
        if (laddaHeaderRef.current) {
            headerLaddaInstance.current = Ladda.create(laddaHeaderRef.current)
        }
        if (laddaHeroRef.current) {
            heroLaddaInstance.current = Ladda.create(laddaHeroRef.current)
        }
        if (laddaHeroRef.current) {
            selectorsLaddaInstance.current = Ladda.create(laddaSelectorsRef.current)
        }
    }, [])

    function handleHeaderClick() {
        if (headerLaddaInstance.current) headerLaddaInstance.current.start()
        setTimeout(() => {
            headerLaddaInstance.current?.stop()
            navigate('/board')
        }, 1000)
    }

    function handleHeroClick() {
        if (heroLaddaInstance.current) heroLaddaInstance.current.start()
        setTimeout(() => {
            heroLaddaInstance.current?.stop()
            navigate('/board')
        }, 1000)
    }

    function handleSelectorsClick() {
        if (selectorsLaddaInstance.current) {
            selectorsLaddaInstance.current.start()
        }

        setTimeout(() => {
            if (selectorsLaddaInstance.current) {
                selectorsLaddaInstance.current.stop()
            }
            navigate('/board')
        }, 1000)
    }

    return (
        <>
            <section className="app-header-wraper">
                <div className="home-app-header">
                    <img src={mindayLogo} alt="Minday Logo" className="logo-img" />
                    <nav className="navbar">
                        <button className="login-btn">Log in</button>
                        <div className="get-started-wraper">
                            <button
                                ref={laddaHeaderRef}
                                className="get-started-btn"
                                data-style="slide-right"
                                onClick={handleHeaderClick}
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

            <main>
                <div className="homepage-hero">
                    <div className="hero-container">
                        <div className="hero-content">
                            <div className="hero-header">
                                <div className="hero-subtitle">
                                    <img src={logo} alt="minday-logo"></img>
                                    <span>work platform</span>
                                </div>
                                <div className="hero-title">
                                    <h1>Made for work,<br /> designed to love</h1>
                                </div>
                                <p className="hero-description">
                                    Streamline workflows, gain clear visibility across teams, and empower<br /> smarter decisions with AI seamlessly woven into your work.
                                </p>

                                <button
                                    ref={laddaHeroRef}
                                    className="get-started-hero"
                                    data-style="slide-right"
                                    onClick={handleHeroClick}
                                >
                                    <span className="get-started">
                                        <span>Get Started</span>
                                        <span className="arrow-icon">
                                            <HomeArrowIcon />
                                        </span>
                                    </span>
                                    <span className="ladda-spinner"></span>
                                </button>

                                <p className="reassurance-text">No credit card needed &nbsp; ✦ &nbsp; Unlimited time on Free plan</p>
                            </div>

                            <div className="assets-container">
                                <div className="asset-selectors-container">
                                    <p class="title">What would you like to manage?</p>
                                    <div className="selectors-grid">
                                        <div className="selector project">
                                            <div className="project-icon"><ProjectsIcon /></div>
                                            <p class="asset-title">Projects</p>
                                        </div>
                                        <div className="selector task">
                                            <div className="task-icon"><TasksIcon /></div>
                                            <p class="asset-title">Tasks</p>
                                        </div>
                                        <div className="selector marketing">
                                            <div className="marketing-icon"><MarketingIcon /></div>
                                            <p class="asset-title">Marketing</p>
                                        </div>
                                        <div className="selector design">
                                            <div className="design-icon"><DesignIcon /></div>
                                            <p class="asset-title">Design</p>
                                        </div>
                                        <div className="selector crm">
                                            <div className="crm-icon"><CrmIcon /></div>
                                            <p class="asset-title">CRM</p>
                                        </div>
                                        <div className="selector software">
                                            <div className="software-icon"><SoftwareIcon /></div>
                                            <p class="asset-title">Software</p>
                                        </div>
                                        <div className="selector it">
                                            <div className="it-icon"><ITIcon /></div>
                                            <p class="asset-title">IT</p>
                                        </div>
                                        <div className="selector operation">
                                            <div className="operation-icon"><OperationsIcon /></div>
                                            <p class="asset-title">Operations</p>
                                        </div>
                                        <div className="selector product">
                                            <div className="product-icon"><ProductIcon /></div>
                                            <p class="asset-title">Product</p>
                                        </div>
                                    </div>


                                    <button
                                        ref={laddaSelectorsRef}
                                        className="get-started-selectors"
                                        data-style="slide-right"
                                        onClick={handleSelectorsClick}
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
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}