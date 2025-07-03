import { useNavigate } from 'react-router-dom'

export function FloatingChatIcon() {
    const navigate = useNavigate()

    return (
        <div className="floating-chat-icon" onClick={() => navigate('/chat')}>
            <span className="help-text">Help</span>
        </div>
    )
}