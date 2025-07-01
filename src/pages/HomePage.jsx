import { useEffect, useRef, useState } from 'react'
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
    const [selected, setSelected] = useState(null)

    const laddaHeaderRef = useRef(null)
    const laddaHeroRef = useRef(null)
    const laddaSelectorsRef = useRef(null)

    const headerLaddaInstance = useRef(null)
    const heroLaddaInstance = useRef(null)
    const selectorsLaddaInstance = useRef(null)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])



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
            <section className={`app-header-wraper ${isScrolled ? 'scrolled' : ''}`}>
                <div className="home-app-header">
                    <img src={mindayLogo} alt="Minday Logo" className="logo-img" />
                    <nav className="navbar">
                        <button className="login-btn" onClick={() => navigate('/login')}>Log in</button>
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
                                    <p className="title">What would you like to manage?</p>
                                    <div className="selectors-grid">
                                        <div className="selector project" onMouseEnter={() => setSelected('project')} onMouseLeave={() => setSelected(null)}>
                                            <div className="project-icon"><ProjectsIcon /></div>
                                            <p className="asset-title">Projects</p>
                                        </div>
                                        <div className="selector task" onMouseEnter={() => setSelected('task')} onMouseLeave={() => setSelected(null)}>
                                            <div className="task-icon"><TasksIcon /></div>
                                            <p className="asset-title">Tasks</p>
                                        </div>
                                        <div className="selector marketing" onMouseEnter={() => setSelected('marketing')} onMouseLeave={() => setSelected(null)}>
                                            <div className="marketing-icon"><MarketingIcon /></div>
                                            <p className="asset-title">Marketing</p>
                                        </div>
                                        <div className="selector design" onMouseEnter={() => setSelected('design')} onMouseLeave={() => setSelected(null)}>
                                            <div className="design-icon"><DesignIcon /></div>
                                            <p className="asset-title">Design</p>
                                        </div>
                                        <div className="selector crm" onMouseEnter={() => setSelected('crm')} onMouseLeave={() => setSelected(null)}>
                                            <div className="crm-icon"><CrmIcon /></div>
                                            <p className="asset-title">CRM</p>
                                        </div>
                                        <div className="selector software" onMouseEnter={() => setSelected('software')} onMouseLeave={() => setSelected(null)}>
                                            <div className="software-icon"><SoftwareIcon /></div>
                                            <p className="asset-title">Software</p>
                                        </div>
                                        <div className="selector it" onMouseEnter={() => setSelected('it')} onMouseLeave={() => setSelected(null)}>
                                            <div className="it-icon"><ITIcon /></div>
                                            <p className="asset-title">IT</p>
                                        </div>
                                        <div className="selector operation" onMouseEnter={() => setSelected('operation')} onMouseLeave={() => setSelected(null)}>
                                            <div className="operation-icon"><OperationsIcon /></div>
                                            <p className="asset-title">Operations</p>
                                        </div>
                                        <div className="selector product" onMouseEnter={() => setSelected('product')} onMouseLeave={() => setSelected(null)}>
                                            <div className="product-icon"><ProductIcon /></div>
                                            <p className="asset-title">Product</p>
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
                                <div>
                                    <img className="asset-img" src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750767888/Blur_qea9fg.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'project' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769517/projects_wdajw6.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'task' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769918/Task_kgzhnq.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'marketing' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769914/Marketing_yh9fhn.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'design' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769914/Design_cd9nuk.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'crm' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769914/CRM-firstfold-AI_fyut1g.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'software' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769915/software_m3agce.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'it' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769914/IT_aobj1t.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'operation' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769915/Operations_pbhxe1.avif" alt=""></img>
                                    <img className={`asset-img regular ${selected === 'product' ? 'selected' : ''}`} src="https://res.cloudinary.com/drx3ncwmd/image/upload/v1750769915/product_japvtu.avif" alt=""></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}