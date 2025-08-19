import React, { useEffect, useMemo, useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import MedsPage from './pages/MedsPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import DocumentsPage from './pages/DocumentsPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import FamilyPage from './pages/FamilyPage.jsx'
import { Api } from './api.js'

const AppContext = React.createContext(null)

function useHashRoute() {
	const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/')
	useEffect(() => {
		const onHash = () => setRoute(window.location.hash.replace('#', '') || '/')
		window.addEventListener('hashchange', onHash)
		return () => window.removeEventListener('hashchange', onHash)
	}, [])
	const navigate = (to) => {
		if (!to.startsWith('/')) to = '/' + to
		window.location.hash = to
	}
	return { route, navigate }
}

export default function App() {
	const { route, navigate } = useHashRoute()
	const [unreadCount, setUnreadCount] = useState(3)
	const [circle, setCircle] = useState({ id: null, name: null, members: [] })
	const [calendar, setCalendar] = useState([])
	const [meds, setMeds] = useState([])

	const contextValue = useMemo(() => ({
		route,
		navigate,
		unreadCount,
		setUnreadCount,
		circle,
		setCircle,
		calendar,
		setCalendar,
		meds,
		setMeds,
		api: Api,
	}), [route, navigate, unreadCount, circle, calendar, meds])

	useEffect(() => {
		document.title = 'CareCrew'
	}, [])

	const Header = () => (
		<div className="cc-header">
			<button className="cc-logo" onClick={() => navigate('/')}>CareCrew</button>
			<button className="cc-bell" onClick={() => navigate('/notifications')} aria-label="Notifications">
				<span className="icon">🔔</span>
				{unreadCount > 0 && <span className="badge" data-testid="badge">{unreadCount}</span>}
			</button>
		</div>
	)

	const Page = () => {
		switch (route) {
			case '/':
				return <Dashboard />
			case '/calendar':
				return <CalendarPage />
			case '/tasks':
				return <TasksPage />
			case '/meds':
				return <MedsPage />
			case '/notifications':
				return <NotificationsPage />
			case '/docs':
				return <DocumentsPage />
			case '/chat':
				return <ChatPage />
			case '/settings':
				return <SettingsPage />
			case '/family':
				return <FamilyPage />
			default:
				return <Dashboard />
		}
	}

	return (
		<AppContext.Provider value={contextValue}>
			<div className="cc-container">
				<Header />
				<div className="cc-content">
					<Page />
				</div>
			</div>
		</AppContext.Provider>
	)
}

export function useApp() {
	const ctx = React.useContext(AppContext)
	if (!ctx) throw new Error('useApp must be used within AppContext')
	return ctx
}



