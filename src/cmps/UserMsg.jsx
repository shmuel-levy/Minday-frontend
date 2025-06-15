import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'
import { SuccessIcon } from '../cmps/svg/SuccessIcon'
import { DeleteIcon } from '../cmps/svg/CloseIcon'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBus.on('show-msg', msg => {
            setMsg(msg)
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })

        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
            showSuccessMsg(`New review about me ${review.txt}`)
        })

        return () => {
            unsubscribe()
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    return (
        <div className="user-msg-wrapper">
            <section className={`user-msg ${msg?.type} ${msg ? 'visible' : ''}`}>
                <div className="icon">
                    {msg?.type === 'success' && <SuccessIcon />}
                </div>

                <div className="content-container">
                    <div className="text-content">{msg?.txt}</div>
                    <button className="undo-btn">Undo</button>
                </div>

                <button className="close-btn-msg" onClick={closeMsg}>
                    <DeleteIcon />
                </button>
            </section>
        </div>
    )
}