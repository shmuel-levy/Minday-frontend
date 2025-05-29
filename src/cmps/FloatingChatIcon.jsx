import { useNavigate } from 'react-router-dom'

export function FloatingChatIcon() {
    const navigate = useNavigate()

    return (
        <div className="floating-chat-icon" onClick={() => navigate('/chat')}>
            <img 
                src="/src/assets/img/help.svg" 
                alt="Chat" 
                className="chat-icon"
            />
        </div>
    )
}