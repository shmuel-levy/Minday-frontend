import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { userService } from './services/user/user.service.local.js'
import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { BoardDetails } from './pages/BoardDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { Sidebar } from './cmps/Sidebar'
import { FloatingChatIcon } from './cmps/FloatingChatIcon'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

export function RootCmp() {
    return (
        <div className="main-container main-layout">
            <AppHeader />
            <div className="app-body">
                <Sidebar />
                <div className="main-content">
                    <UserMsg />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="board" element={<BoardIndex />} />
                            <Route path="board/:boardId" element={<BoardDetails />} />
                            <Route path="user/:id" element={<UserDetails />} />
                            <Route path="chat" element={<ChatApp />} />
                            <Route path="admin" element={
                                <AuthGuard checkAdmin={true}>
                                    <AdminIndex />
                                </AuthGuard>
                            } />
                            <Route path="login" element={<LoginSignup />}>
                                <Route index element={<Login />} />
                                <Route path="signup" element={<Signup />} />
                            </Route>
                        </Routes>
                    </main>
                </div>
            </div>
            <FloatingChatIcon />
        </div>
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