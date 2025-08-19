import React, { useState } from 'react'
import { useApp } from '../App.jsx'

export default function MedsPage() {
	const { navigate, meds, setMeds, api } = useApp()
	const [form, setForm] = useState({ name: '', dosage: '', times: '', repeat: 'daily' })
	const [adherence, setAdherence] = useState({})

	const addMed = async (e) => {
		e.preventDefault()
		const item = await api.meds.create(form)
		setMeds([item, ...meds])
		setForm({ name: '', dosage: '', times: '', repeat: 'daily' })
	}

	const log = (id, status) => {
		setAdherence({ ...adherence, [id]: status })
	}

	return (
		<div>
			<button className="back" onClick={() => navigate('/')}>← Back to Dashboard</button>
			<p className="muted">Medications and adherence are visible to your Care Circle.</p>
			<h2>Medications</h2>
			<form onSubmit={addMed} className="form">
				<label>
					<span>Name</span>
					<input value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} required />
				</label>
				<label>
					<span>Dosage</span>
					<input value={form.dosage} onChange={(e)=>setForm({ ...form, dosage: e.target.value })} />
				</label>
				<label>
					<span>Times (e.g. 08:00, 20:00)</span>
					<input value={form.times} onChange={(e)=>setForm({ ...form, times: e.target.value })} />
				</label>
				<label>
					<span>Repeat</span>
					<select value={form.repeat} onChange={(e)=>setForm({ ...form, repeat: e.target.value })}>
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
					</select>
				</label>
				<button className="primary" type="submit">Add Medication</button>
			</form>

			<ul className="list">
				{meds.length===0 && <li className="muted">No medications</li>}
				{meds.map(m => (
					<li key={m.id} className="card">
						<div className="title">{m.name} <span className="muted">{m.dosage}</span></div>
						<div className="meta">{m.repeat} • Times: {m.times || '—'}</div>
						<div className="row-gap">
							<button className={adherence[m.id]==='taken'?'positive':''} onClick={()=>log(m.id,'taken')}>Taken</button>
							<button className={adherence[m.id]==='missed'?'negative':''} onClick={()=>log(m.id,'missed')}>Missed</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}


