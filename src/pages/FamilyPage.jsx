import React from 'react'
import { useApp } from '../App.jsx'

export default function FamilyPage() {
	const { navigate, circle } = useApp()
	return (
		<div>
			<button className="back" onClick={() => navigate('/')}>← Back to Dashboard</button>
			<h2>Care Circle</h2>
			{circle?.id ? (
				<div className="card">
					<div className="title">{circle.name}</div>
					<p className="muted">Members</p>
					<ul className="bullets">
						{circle.members.map((m, i) => <li key={i}>{m}</li>)}
					</ul>
					<p className="muted">Invite others from Settings → Create Care Circle.</p>
				</div>
			) : (
				<div className="card">No Care Circle yet. Create or join one in Settings.</div>
			)}
		</div>
	)
}



