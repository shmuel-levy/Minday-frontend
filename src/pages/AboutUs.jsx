import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

export function AboutUs() {
    const [count, setCount] = useState(100)

    function onTellMeMore() {
        console.log('Telling you more about Monday Clone')
    }
    return (
        <section>
            <h2>About Monday Clone</h2>
            <nav>
                <NavLink to="team">Team</NavLink> |
                <NavLink to="vision">Vision</NavLink>
            </nav>

            <section>
                <Outlet />
            </section>

            <SplitPane
                left={
                    <Features />
                }
                right={
                    <ProjectStats />
                } />

            <FancyBox onClose={() => console.log('ok, closing')}>
                <h3>{count.toLocaleString()} Active Users</h3>
                <button onClick={onTellMeMore}>Tell me More</button>
            </FancyBox>

            <p>Monday Clone is a comprehensive project management platform that helps teams organize, track, and manage their work in one centralized place. Built with modern React architecture and real-time collaboration features.</p>
        </section>
    )
}

export function AboutTeam() {
    return (
        <section>
            <h2>Development Team</h2>
            <ul>
                <li>Lead Full Stack Developer</li>
                <li>UI/UX Designer</li>
                <li>Backend Architect</li>
            </ul>
        </section>
    )
}

export function AboutVision() {
    return (
        <section>
            <h2>Our Vision</h2>
            <ul>
                <li>Streamline project management</li>
                <li>Enhance team collaboration</li>
                <li>Provide intuitive task tracking</li>
                <li>Enable real-time productivity</li>
            </ul>
        </section>
    )
}

function FancyBox(props) {
    return <div className="fancy-box">
        <button style={{ float: 'right' }} onClick={props.onClose}>x</button>
        {props.children}
    </div>
}

FancyBox.propTypes = {
    onClose: PropTypes.func.isRequired
}

function Features() {
    return <section style={{ height: '50vh', backgroundColor: 'lightblue' }}>
        <h2>Core Features</h2>
        <ul>
            <li>Dynamic Board System</li>
            <li>Task Management</li>
            <li>Real-time Collaboration</li>
            <li>User Permissions</li>
        </ul>
    </section>
}

function ProjectStats() {
    const [stats, setStats] = useState(['Boards Created: 150', 'Tasks Completed: 1,200'])
    const statsList = stats.map((stat, idx) => (
        <article className="stat-preview" key={stat} onClick={(ev) => {
            ev.stopPropagation()
            setStats(stats.filter(s => s !== stat))
        }}>
            {stat}
        </article>
    ))
    return <section style={{ minHeight: '50vh', backgroundColor: 'lightgreen' }}>
        <h2>Project Statistics</h2>
        {statsList}
        <button onClick={ev => {
            ev.stopPropagation()
            setStats([...stats, 'New Milestone: ' + Date.now() % 100])
        }}>Add Stat</button>
    </section>
}

function SplitPane(props) {

    const [width, setWidth] = useState(30)

    if (false && width === 60) {
        throw new Error('Features cannot load')
    }
    return (
        <div className="split-pane" style={{
            display: 'flex'
        }}>
            <div style={{ width: width + '%' }} onClick={() => {
                if (width + 10 <= 100) setWidth(width + 10)
            }}>
                {props.left}
            </div>
            <div style={{ flex: 1 }} onClick={() => {
                if (width > 10) setWidth(width - 10)
            }}>
                {props.right}
            </div>
        </div>
    )
}