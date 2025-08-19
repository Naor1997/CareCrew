import React from 'react'
import { useApp } from '../App.jsx'

export default function DocumentsPage() {
	const { navigate } = useApp()
	return (
		<div>
			<button className="back" onClick={() => navigate('/')}>← Back to Dashboard</button>
			<h2>Documents</h2>
			<p className="muted">Upload and manage care documents (MVP placeholder).</p>
			<div className="card">Coming soon.</div>
		</div>
	)
}



