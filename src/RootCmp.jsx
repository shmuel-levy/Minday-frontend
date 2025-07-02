import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { useState } from 'react'
import { CreateBoardModal } from './cmps/CreateBoardModal'
import { userService } from './services/user/user.service.local.js'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { BoardDetails } from './pages/BoardDetails'
import { UserDetails } from './pages/UserDetails'
import { Dashboard } from './pages/Dashboard'

import { HomePage } from './pages/HomePage.jsx'
import { AppHeader } from './cmps/AppHeader'
import { Sidebar } from './cmps/Sidebar'
import { FloatingChatIcon } from './cmps/FloatingChatIcon'
import { UserMsg } from './cmps/UserMsg.jsx'
            
import { TaskDetailModal } from './cmps/task-detail-modal/TaskDetailModal.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
// import { AIBoardGenerator } from './pages/AIBoardGenerator'

export function RootCmp() {
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false)
    const [openTaskId, setOpenTaskId] = useState(null)

    function openBoardModal() {
        setIsCreateBoardOpen(true)
    }

    function closeBoardModal() {
        setIsCreateBoardOpen(false)
    }

    return (
        <>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/signup" element={<LoginSignup />} />

                <Route path="/*" element={
                    <div className="main-container main-layout">
                        <AppHeader />
                        <div className="app-body">
                            <Sidebar onOpenBoardModal={openBoardModal} />
                            <div className="main-content">
                                <UserMsg />
                                <Routes>
                                    <Route path="board" element={<BoardIndex />} />
                                    <Route path="board/:boardId" element={<BoardDetails openTaskId={openTaskId} setOpenTaskId={setOpenTaskId} />} />
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="user/:id" element={<UserDetails />} />
                                    <Route path="chat" element={<ChatApp />} />
                                    <Route path="admin" element={
                                        <AuthGuard checkAdmin={true}>
                                            <AdminIndex />
                                        </AuthGuard>
                                    } />
                                    {/* <Route path="ai/generator" element={<AIBoardGenerator />} /> */}
                                </Routes>
                            </div>
                        </div>
                        <FloatingChatIcon />
                    </div>
                } />
            </Routes>
            {openTaskId && (
                <TaskDetailModal
                    taskId={openTaskId}
                    onClose={() => setOpenTaskId(null)}
                />
            )}
            <CreateBoardModal isOpen={isCreateBoardOpen} onClose={closeBoardModal} />
        </>
    )
}

function AuthGuard({ children, checkAdmin = false }) {
    const user = userService.getLoggedinUser()
    const isNotAllowed = !user || (checkAdmin && !user.isAdmin)
    if (isNotAllowed) {
        console.log('Not Authenticated!')
        return <Navigate to="/" />
    }
    return children
}