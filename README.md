# 🚀 Minday - Modern Work Management Platform

[🌐 Live Website](https://minday.onrender.com/)

A comprehensive, production-ready work management application built with React, featuring real-time collaboration, multiple view types, and advanced task management capabilities.

![Minday Platform](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple?style=for-the-badge&logo=vite)
![Redux](https://img.shields.io/badge/Redux-4.2.1-purple?style=for-the-badge&logo=redux)
![Socket.io](https://img.shields.io/badge/Socket.io-4.7.2-green?style=for-the-badge&logo=socket.io)

## 🎯 Overview

Minday is a sophisticated work management platform inspired by Monday.com, designed to streamline team collaboration and project management. Built with modern React patterns and real-time capabilities, it provides a comprehensive solution for teams to organize, track, and visualize their work.

## 📸 Screenshots

### 🏠 Homepage
<img width="947" alt="homepage png" src="https://github.com/user-attachments/assets/55fd7c21-66e7-436f-9b9f-db038f6942f4" />
<img width="949" alt="homepage-recentboards png" src="https://github.com/user-attachments/assets/9ca864b9-e3f2-4e9f-a2a0-a612573f21e6" />

*Landing page with feature showcase and AI-powered demonstrations*


### 📊 Table View
<img width="956" alt="table-view png" src="https://github.com/user-attachments/assets/cea6556a-cdc0-484f-adf9-12cbe17c5518" />

*Spreadsheet-like interface with drag-and-drop functionality and advanced filtering*

### 🎯 Kanban Board
<img width="952" alt="kanban-view png" src="https://github.com/user-attachments/assets/e8b54ede-13ce-4463-8942-d42d4405c057" />

*Visual board with customizable columns and status tracking*

### 📈 Dashboard Analytics
<img width="943" alt="dashboard png" src="https://github.com/user-attachments/assets/b1446cea-76f4-485a-8b22-bef30ca4f33c" />

*Customizable widgets with real-time analytics and data visualization*


## ✨ Key Features

### 📊 Multi-View Interface
- **Table View**: Spreadsheet-like interface with drag-and-drop functionality
- **Kanban View**: Visual board with customizable columns and status tracking
- **Dashboard View**: Customizable widgets with real-time analytics
- **Chart View**: Data visualization for project insights

### 🔄 Real-Time Collaboration
- Live chat system with topic-based channels
- Real-time task updates across all users
- WebSocket-powered instant synchronization
- Team communication with automated bot responses

### 📋 Advanced Task Management
- Full CRUD operations with optimistic updates
- File attachments and rich text updates
- Priority levels and status tracking
- Due dates with timeline visualization
- Multi-select operations and bulk actions
- Drag-and-drop task reordering

### 🎨 Modern UI/UX
- Responsive design with professional styling
- Smooth animations and loading states
- Context menus and advanced interactions
- Empty states with helpful guidance
- Keyboard shortcuts and accessibility features

### 📈 Analytics & Insights
- Status distribution charts
- Task completion metrics
- File gallery and management
- Customizable dashboard widgets
- Real-time data visualization

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** - Modern functional components with hooks
- **Redux** - Centralized state management
- **React Router v6** - Client-side routing
- **Vite** - Fast development and build tooling
- **SCSS** - Advanced styling with variables and mixins

### Key Libraries
- `react-beautiful-dnd` - Drag and drop functionality
- `react-grid-layout` - Resizable dashboard widgets
- `chart.js` & `react-chartjs-2` - Data visualization
- `socket.io-client` - Real-time communication
- `moment.js` - Date handling and formatting
- `ladda` - Loading animations and feedback

### State Management
- **Redux Store** with modular reducers
- **Optimistic Updates** for enhanced UX
- **Local Storage** persistence
- **Real-time Sync** via WebSockets

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shmuel-levy/Minday-frontend.git
   cd minday-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts
```bash
npm run dev          # Start development server
npm run dev:local    # Start with local storage mode
npm run dev:remote   # Start with remote backend mode
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets (fonts, images, styles)
├── cmps/           # Reusable components
│   ├── board-header/    # Board navigation components
│   ├── dashboard/       # Dashboard widgets
│   ├── kanban/         # Kanban board components
│   ├── table/          # Table view components
│   └── svg/            # Icon components
├── customHooks/     # Custom React hooks
├── pages/           # Page components
├── services/        # API and utility services
├── store/           # Redux store and actions
└── index.jsx        # Application entry point
```

## 🎨 Core Components

### Board Management
- **BoardTable**: Main table interface with drag-and-drop
- **KanbanBoard**: Visual board with status columns
- **Dashboard**: Widget-based analytics view
- **BoardHeader**: Navigation and controls

### Task Management
- **DynamicTaskRow**: Interactive task rows
- **TaskDetailModal**: Comprehensive task editing
- **TaskCheckbox**: Multi-select functionality
- **GroupHeader**: Task grouping and organization

### Real-time Features
- **ChatApp**: Team communication interface
- **SocketService**: WebSocket connection management
- **FloatingChatIcon**: Quick access to chat

## 🔧 Advanced Features

### Drag & Drop System
- Task reordering within groups
- Cross-group task movement
- Kanban column reordering
- Dashboard widget positioning

### Data Persistence
- Local storage for offline capability
- Optimistic updates for performance
- Real-time synchronization
- Data validation and error handling

### Responsive Design
- Mobile-friendly layouts
- Adaptive component sizing
- Touch-friendly interactions
- Cross-browser compatibility

## 🎯 Interview Highlights

### Technical Complexity
- **State Management**: Complex Redux implementation with optimistic updates
- **Real-time Features**: WebSocket integration for live collaboration
- **Performance**: Optimized rendering with React best practices
- **Architecture**: Modular component structure with custom hooks

### Problem Solving
- **Drag & Drop**: Custom implementation with react-beautiful-dnd
- **Data Visualization**: Chart.js integration for analytics
- **File Management**: Upload system with preview capabilities
- **User Experience**: Loading states, error handling, and feedback

### Code Quality
- **ESLint**: Strict code quality standards
- **Component Design**: Reusable, maintainable components
- **Type Safety**: PropTypes and validation
- **Documentation**: Comprehensive code comments

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```env
VITE_LOCAL=true          # Use local storage mode
VITE_LOCAL=false         # Use remote backend mode
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] AI-powered task suggestions
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Third-party integrations
- [ ] Advanced automation workflows
- [ ] Enhanced security features


---

**Built with ❤️ using React, Redux, and modern web technologies**

*This project demonstrates advanced React development skills, modern UI/UX design principles, and comprehensive feature implementation suitable for enterprise-level applications.*
