import React, { useMemo } from 'react'
import { useApp } from '../App.jsx'
import { parseDateTime, formatRelative } from '../utils/time.js'

const cards = [
	{ key: 'calendar', label: 'Calendar', icon: '📅', to: '/calendar' },
	{ key: 'tasks', label: 'Tasks', icon: '✅', to: '/tasks' },
	{ key: 'meds', label: 'Medications', icon: '💊', to: '/meds' },
	{ key: 'docs', label: 'Documents', icon: '📄', to: '/docs' },
	{ key: 'chat', label: 'Chat', icon: '💬', to: '/chat' },
	{ key: 'family', label: 'Care Circle', icon: '👨‍👩‍👧‍👦', to: '/family' },
	{ key: 'settings', label: 'Settings', icon: '⚙️', to: '/settings' },
]

export default function Dashboard() {
	const { navigate, circle, calendar, meds } = useApp()

	const { todayAppointments, weekAppointments, todayMedsSummary } = useMemo(() => {
		const now = new Date()
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		const endOfWeek = new Date(startOfToday)
		endOfWeek.setDate(endOfWeek.getDate() + 7)

		const parsedAppointments = (calendar || [])
			.map((c) => ({ ...c, when: parseDateTime(c) }))
			.filter((c) => c.when instanceof Date && !isNaN(c.when))
			.sort((a, b) => a.when - b.when)

		const todayAppointments = parsedAppointments.filter((c) => {
			return c.when >= startOfToday && c.when < endOfWeek && c.when.toDateString() === startOfToday.toDateString()
		})

		const weekAppointments = parsedAppointments.filter((c) => c.when >= startOfToday && c.when < endOfWeek)

		// Simple meds summary for today: count and list names
		const todayMedsSummary = {
			count: (meds || []).length,
			names: (meds || []).map((m) => m.name).slice(0, 3),
		}

		return { todayAppointments, weekAppointments, todayMedsSummary }
	}, [calendar, meds])
	return (
		<div>
			<div className="cc-hero">
				<h1>CareCrew</h1>
				<p className="muted">Focus on care, not coordination.</p>
				<p className="circle-status">{circle?.id ? `Family: ${circle.name} – ${circle.members.length} members` : 'No Care Circle yet'}</p>
			</div>

			<div className="quick-preview">
				<div className="card">
					<div className="title">Today</div>
					<div className="preview-row">
						<span>Medications</span>
						<span className="chip">{todayMedsSummary.count}</span>
					</div>
					{todayMedsSummary.names.length > 0 && (
						<p className="muted small">{todayMedsSummary.names.join(', ')}{meds.length > 3 ? '…' : ''}</p>
					)}
					<div className="divider"></div>
					<div className="title small">Appointments</div>
					{todayAppointments.length === 0 && <p className="muted">No appointments today</p>}
					{todayAppointments.map((a) => (
						<div key={a.id} className="preview-item">
							<div className="pi-title">{a.title}</div>
							<div className="pi-meta muted">{a.time || ''} • {formatRelative(a.when)}</div>
						</div>
					))}
				</div>

				<div className="card">
					<div className="title">This week</div>
					{weekAppointments.length === 0 && <p className="muted">No upcoming appointments</p>}
					{weekAppointments.slice(0, 4).map((a) => (
						<div key={a.id} className="preview-item">
							<div className="pi-title">{a.title}</div>
							<div className="pi-meta muted">{a.when.toLocaleDateString()} {a.time || ''} • {formatRelative(a.when)}</div>
						</div>
					))}
					{weekAppointments.length > 4 && (
						<button className="link" onClick={() => navigate('/calendar')}>View all</button>
					)}
				</div>
			</div>
			<div className="card-grid">
				{cards.map((c) => (
					<button key={c.key} className="icon-card" onClick={() => navigate(c.to)}>
						<span className="icon">{c.icon}</span>
						<span className="label">{c.label}</span>
					</button>
				))}
			</div>
		</div>
	)
}



