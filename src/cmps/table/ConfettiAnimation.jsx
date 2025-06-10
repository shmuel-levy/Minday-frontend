import { useEffect, useState } from 'react'

export function ConfettiAnimation({ isActive, onComplete }) {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        if (!isActive) return

        const newParticles = []
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#ff9ff3', '#54a0ff']
        
        for (let i = 0; i < 25; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 1,
                size: Math.random() * 6 + 4, 
                direction: Math.random() > 0.5 ? 1 : -1, 
                speed: Math.random() * 0.5 + 0.5, 
                bounce: Math.random() * 20 + 10 
            })
        }
        
        setParticles(newParticles)

        const timer = setTimeout(() => {
            setParticles([])
            onComplete?.()
        }, 3500)

        return () => clearTimeout(timer)
    }, [isActive, onComplete])

    if (!isActive || particles.length === 0) return null

    return (
        <div className="confetti-container">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="confetti-particle"
                    style={{
                        left: `${particle.x}%`,
                        backgroundColor: particle.color,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${2 + particle.speed}s`
                    }}
                    // className={`confetti-particle direction-${particle.direction > 0 ? 'right' : 'left'}`}
                />
            ))}
        </div>
    )
}