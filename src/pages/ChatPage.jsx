import React from 'react'
import { useApp } from '../App.jsx'

export default function ChatPage() {
	const { navigate } = useApp()
	return (
		<div>
			<button className="back" onClick={() => navigate('/')}>← Back to Dashboard</button>
			<h2>Chat</h2>
			<div className="card">Simple chat placeholder for MVP.</div>
		</div>
	)
}



