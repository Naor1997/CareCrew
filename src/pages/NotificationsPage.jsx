import React, { useEffect, useState } from 'react'
import { useApp } from '../App.jsx'

export default function NotificationsPage() {
	const { navigate, api, setUnreadCount } = useApp()
	const [items, setItems] = useState([])

	useEffect(() => {
		let mounted = true
		api.notifications.getAll().then((data) => {
			if (!mounted) return
			setItems(data)
			setUnreadCount(0)
		})
		return () => { mounted = false }
	}, [])

	const markAllRead = async () => {
		await api.notifications.markAllRead()
		setItems(items.map((n) => ({ ...n, read: true })))
		setUnreadCount(0)
	}

	return (
		<div>
			<button className="back" onClick={() => navigate('/')}>← Back to Dashboard</button>
			<p className="muted">Opening clears the badge for current notifications.</p>
			<div className="row-between">
				<h2>Notifications</h2>
				<button onClick={markAllRead}>Mark all read</button>
			</div>
			<ul className="list">
				{items.length===0 && <li className="muted">No notifications</li>}
				{items.map(n => (
					<li key={n.id} className={`card ${n.read? 'muted' : ''}`}>
						{n.text}
					</li>
				))}
			</ul>
		</div>
	)
}


