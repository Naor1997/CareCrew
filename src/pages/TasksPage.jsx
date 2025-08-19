import React, { useState } from 'react'
import { useApp } from '../App.jsx'

export default function TasksPage() {
	const { navigate } = useApp()
	const [tasks, setTasks] = useState([])
	const [text, setText] = useState('')
	return (
		<div>
			<button className="back" onClick={() => navigate('/')}>← Back to Dashboard</button>
			<p className="muted">Tasks are shared with your Care Circle.</p>
			<h2>Tasks</h2>
			<form onSubmit={(e)=>{e.preventDefault(); if(!text) return; setTasks([{ id: Date.now(), text, done:false }, ...tasks]); setText('')}} className="row-gap">
				<input placeholder="New task" value={text} onChange={(e)=>setText(e.target.value)} />
				<button className="primary" type="submit">Add</button>
			</form>
			<ul className="list">
				{tasks.length===0 && <li className="muted">No tasks yet</li>}
				{tasks.map(t => (
					<li key={t.id} className="card row-between">
						<label className="row-gap">
							<input type="checkbox" checked={t.done} onChange={()=>setTasks(tasks.map(x=>x.id===t.id?{...x,done:!x.done}:x))} />
							<span className={t.done? 'strike' : ''}>{t.text}</span>
						</label>
						<button onClick={()=>setTasks(tasks.filter(x=>x.id!==t.id))}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	)
}


