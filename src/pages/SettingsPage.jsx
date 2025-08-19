import React, { useState } from 'react'
import { useApp } from '../App.jsx'

export default function SettingsPage() {
	const { navigate, api, setCircle } = useApp()
	const [name, setName] = useState('Family')
	const [code, setCode] = useState('')
	const [createdCode, setCreatedCode] = useState('')

	const createCircle = async (e) => {
		e.preventDefault()
		const res = await api.circle.create(name)
		setCircle({ id: res.id, name: res.name, members: res.members })
		setCreatedCode(res.inviteCode)
	}

	const joinCircle = async (e) => {
		e.preventDefault()
		const res = await api.circle.join(code)
		setCircle({ id: res.id, name: res.name, members: res.members })
	}

	return (
		<div>
			<button className="back" onClick={() => navigate('/')}>← Back to Dashboard</button>
			<h2>Settings</h2>

			<div className="card">
				<h3>Create Care Circle</h3>
				<form onSubmit={createCircle} className="form">
					<label>
						<span>Name</span>
						<input value={name} onChange={(e)=>setName(e.target.value)} />
					</label>
					<button className="primary" type="submit">Create</button>
				</form>
				{createdCode && <p className="muted">Invite code: <strong>{createdCode}</strong></p>}
			</div>

			<div className="card">
				<h3>Join Care Circle</h3>
				<form onSubmit={joinCircle} className="form">
					<label>
						<span>Invite code</span>
						<input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="e.g. 1A2B3C" />
					</label>
					<button className="primary" type="submit">Join</button>
				</form>
			</div>

			<div className="card">
				<h3>Account</h3>
				<button className="negative">Log out</button>
			</div>
		</div>
	)
}



