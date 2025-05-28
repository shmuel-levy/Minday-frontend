import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export function ChatApp() {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState('Project Updates')
    const [isBotMode, setIsBotMode] = useState(false)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const botTimeoutRef = useRef()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendBotResponse() {
        // Handle case: send single bot response (debounce).
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            const responses = [
                'Great progress on the project!',
                'Let\'s schedule a team meeting.',
                'Don\'t forget to update your board status.',
                'Excellent teamwork everyone!',
                'Keep up the momentum!'
            ]
            const randomResponse = responses[Math.floor(Math.random() * responses.length)]
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Project Bot', txt: randomResponse }]))
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        if (isBotMode) sendBotResponse()
        // while dummy sockets - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat">
            <h2>Team Chat - {topic}</h2>

            <section className="chat-options">
                <label>
                    <input type="radio" name="topic" value="Project Updates"
                        checked={topic === 'Project Updates'} onChange={({ target }) => setTopic(target.value)} />
                    Project Updates
                </label>

                <label>
                    <input
                        type="radio" name="topic" value="Team Discussion"
                        checked={topic === 'Team Discussion'} onChange={({ target }) => setTopic(target.value)} />
                    Team Discussion
                </label>

                <label>
                    <input
                        type="radio" name="topic" value="Board Planning"
                        checked={topic === 'Board Planning'} onChange={({ target }) => setTopic(target.value)} />
                    Board Planning
                </label>

                <label>
                    <input type="checkbox" name="isBotMode" checked={isBotMode}
                        onChange={({ target }) => setIsBotMode(target.checked)} />
                    Project Bot
                </label>
            </section>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" placeholder="Type your message..." />
                <button>Send</button>
            </form>

            <ul className="messages-list">
                {msgs.map((msg, idx) => (<li key={idx}><strong>{msg.from}:</strong> {msg.txt}</li>))}
            </ul>
        </section>
    )
}