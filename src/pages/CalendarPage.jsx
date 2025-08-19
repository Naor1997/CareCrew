import React, { useMemo, useState } from 'react'
import { useApp } from '../App.jsx'
import { parseDateTime, formatRelative } from '../utils/time.js'

export default function CalendarPage() {
	const { navigate, calendar, setCalendar, api } = useApp()
	const [showModal, setShowModal] = useState(false)
	const [form, setForm] = useState({ title: '', date: '', time: '', companion: '', logistics: '', notes: '' })

	const addAppointment = async (e) => {
		e?.preventDefault()
		const item = await api.calendar.create(form)
		setCalendar([item, ...calendar])
		setShowModal(false)
		setForm({ title: '', date: '', time: '', companion: '', logistics: '', notes: '' })
	}

	const items = useMemo(() => {
		return (calendar || [])
			.map((c) => ({ ...c, when: parseDateTime(c) }))
			.filter((c) => c.when instanceof Date && !isNaN(c.when))
			.sort((a, b) => a.when - b.when)
	}, [calendar])

	return (
		<div>
			<button className="back" onClick={() => navigate('/')}>← Back to Dashboard</button>
			<p className="muted">Events are shared with your Care Circle.</p>
			<h2>Calendar</h2>
			<ul className="list">
				{items.length === 0 && <li className="muted">No appointments yet</li>}
				{items.map((c) => (
					<li key={c.id} className="card">
						<div className="row-between">
							<div className="title">{c.title}</div>
							<div className="muted small">{formatRelative(c.when)}</div>
						</div>
						<div className="meta">{c.when.toLocaleDateString()} {c.time}</div>
						{c.companion && <div className="meta">With: {c.companion}</div>}
						{c.logistics && <div className="meta">Logistics: {c.logistics}</div>}
						{c.notes && <div className="notes">{c.notes}</div>}
					</li>
				))}
			</ul>

			<button className="fab" onClick={() => setShowModal(true)} aria-label="New Appointment">＋</button>

			{showModal && (
				<div className="modal-backdrop" onClick={() => setShowModal(false)}>
					<div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
						<button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
						<h3>New Appointment</h3>
						<form onSubmit={addAppointment} className="form">
							<label>
								<span>Title</span>
								<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
							</label>
							<label>
								<span>Date</span>
								<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
							</label>
							<label>
								<span>Time</span>
								<input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
							</label>
							<label>
								<span>Who is taking the patient</span>
								<input value={form.companion} onChange={(e) => setForm({ ...form, companion: e.target.value })} placeholder="e.g. Mom, Sam" />
							</label>
							<label>
								<span>Transportation / Preparation</span>
								<input value={form.logistics} onChange={(e) => setForm({ ...form, logistics: e.target.value })} placeholder="e.g. Taxi at 1:30pm, bring ID" />
							</label>
							<label>
								<span>Notes</span>
								<textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}></textarea>
							</label>
							<button type="submit" className="primary">Save</button>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}


