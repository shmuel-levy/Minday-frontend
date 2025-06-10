import { useEffect, useState } from 'react'

export function ConfettiAnimation({ isActive, onComplete }) {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        if (!isActive) return
        const newParticles = []
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']
        
        for (let i = 0; i < 15; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 80 + 10, 
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.5 
            })
        }
        
        setParticles(newParticles)

        const timer = setTimeout(() => {
            setParticles([])
            onComplete?.()
        }, 2500)

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
                        animationDelay: `${particle.delay}s`
                    }}
                />
            ))}
        </div>
    )
}