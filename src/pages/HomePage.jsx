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
import { SliderLeftIcon } from '../cmps/svg/Homepage/SliderLeftIcon'
import { SliderRightIcon } from '../cmps/svg/Homepage/SliderRightIcon'
import { AiVideoCard } from '../cmps/AiVideoCard'

import aiPoster1 from '../assets/img/ai-poster-1.jpg';
import aiPoster2 from '../assets/img/ai-poster-2.jpg';
import aiPoster3 from '../assets/img/ai-poster-3.jpg';
import footerLogo from '../assets/img/minday-logo-home.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

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

    const cardContainerRef = useRef();

    function scrollRight() {
        const rail = cardContainerRef.current;
        rail.scrollBy({ left: 600, behavior: 'smooth' });   // ⬅️ change this
    }

    function scrollLeft() {
        const rail = cardContainerRef.current;
        rail.scrollBy({ left: -600, behavior: 'smooth' });  // ⬅️ match here
    }

    const aiAssets = [
        {
            poster: aiPoster1,
            src: 'https://dapulse-res.cloudinary.com/video/upload/v1742978541/ai_AI_blocks.mp4',
            title: 'AI Blocks',
            blurb: 'Let AI run manual tasks in your workflows—so you can focus on what matters most.',
        },
        {
            poster: aiPoster2,
            src: 'https://dapulse-res.cloudinary.com/video/upload/v1742993669/ai_Digital_workforce_1.mp4',
            title: 'Digital Workforce',
            blurb: 'Hire an AI team of specialists to handle tasks, share insights, and keep work flowing.',
            comingSoon: true,
        },
        {
            poster: aiPoster3,
            src: 'https://dapulse-res.cloudinary.com/video/upload/v1742819205/ai_Product_Power-ups_uiag0g.mp4',
            title: 'Product Power-ups',
            blurb: 'Harness AI features built to take on your team’s most complex challenges.',
            comingSoon: true,
        },
    ];

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

                <div className="title-wraper">
                    <div className="main-title">Your work, elevated</div>
                    <div className="secondary-title">One platform built for every team—what will you run?</div>
                </div>

                <div className="slick-slider">

                    <div className="prev">
                        <button onClick={scrollLeft}>
                            <SliderLeftIcon />

                        </button>
                    </div>

                    <div className="slick-list" ref={cardContainerRef} >

                        <div className="slick-card card-1">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">Marketing<br />& Brand</div>
                                    <div className="card-subtitle">Launch imapctful,<br /> campaigns  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/wm-outline.png' /></picture>


                            </div>
                        </div>

                        <div className="slick-card card-2" >
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">Projects<br />& Tasks</div>
                                    <div className="card-subtitle">Deliver on time,<br /> every time  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/wm-outline.png' /></picture>
                            </div>
                        </div>

                        <div className="slick-card card-3">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">CRM<br />& Sales</div>
                                    <div className="card-subtitle">Focus on the most,<br /> promising deals  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/CRM-outline.png' /></picture>
                            </div>
                        </div>

                        <div className="slick-card card-4">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">IT<br />& Support</div>
                                    <div className="card-subtitle">Resolove tickets,<br /> 10 times faster  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/Service-outline.png' /></picture>
                            </div>
                        </div>

                        <div className="slick-card card-5">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">Operations<br />& Finance</div>
                                    <div className="card-subtitle">Scale operations,<br /> seamlessly  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/wm-outline.png' /></picture>
                            </div>
                        </div>

                        <div className="slick-card card-6">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">Creative<br />& Design</div>
                                    <div className="card-subtitle">Creative work,<br /> perfectly harmonized  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/wm-outline.png' /></picture>
                            </div>
                        </div>

                        <div className="slick-card card-7">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">Product<br />& Software</div>
                                    <div className="card-subtitle">Amplify sprint velocity <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/DEV-outline.png' /></picture>
                            </div>
                        </div>

                        <div className="slick-card card-8">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">HR<br />& Recruiting</div>
                                    <div className="card-subtitle">Secure top talent, <br /> effortlessly <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/DEV-outline.png' /></picture>
                            </div>
                        </div>

                        <div className="slick-card card-1">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">Marketing<br />& Brand</div>
                                    <div className="card-subtitle">Launch imapctful,<br /> campaigns  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/wm-outline.png' /></picture>


                            </div>
                        </div>

                        <div className="slick-card card-2" >
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">Projects<br />& Tasks</div>
                                    <div className="card-subtitle">Deliver on time,<br /> every time  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/wm-outline.png' /></picture>
                            </div>
                        </div>

                        <div className="slick-card card-3">
                            <div className="card-details">
                                <div className="text-content">
                                    <div className="card-title">CRM<br />& Sales</div>
                                    <div className="card-subtitle">Focus on the most,<br /> promising deals  <img src=' https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png' /></div>
                                </div>
                                <picture> <img src='https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Homepage%20-%202024/Products-%20logos/CRM-outline.png' /></picture>
                            </div>
                        </div>



                    </div>

                    <div className="next">
                        <button className="right-arrow" onClick={scrollRight}>
                            <SliderRightIcon />
                        </button>
                    </div>
                </div>

                <div className="ai-header">
                    <div className="ai-title">
                        The power of AI<br />right where you work
                    </div>
                </div>

                <div className="ai-videos-container">
                    {aiAssets.map(card => (
                        <div className="videos">
                            <AiVideoCard key={card.title} {...card} />
                        </div>
                    ))}
                </div>


                <footer className="app-footer">
                    <div className="footer-left">
                        <img className="footer-logo" src={footerLogo} alt="Minday" />
                        <p className="footer-desc">
                            A collaborative project-management tool built with precision and purpose.
                        </p>
                    </div>

                    <div className="footer-centre">
                        <h4 className="footer-heading">Project Contributors</h4>

                        <ul className="footer-team-list">
                            <li>
                                <a href="https://github.com/shoham-shtiler" target="_blank" rel="noreferrer">
                                    Shoham Shtiler
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/AgamMorLevy" target="_blank" rel="noreferrer">
                                    Agam Mor Levy
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ShmuelLevy" target="_blank" rel="noreferrer">
                                    Shmuel Levy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-right">
                        © {new Date().getFullYear()} Minday. All rights reserved.
                    </div>
                </footer>
            </main>
        </>
    )
}