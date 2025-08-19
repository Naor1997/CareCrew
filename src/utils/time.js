export function parseDateTime(item){
	try{
		if(!item?.date) return null
		const [y,m,d] = item.date.split('-').map(Number)
		let hours = 0, minutes = 0
		if(item?.time){
			const [h,mm] = item.time.split(':').map(Number)
			hours = h || 0
			minutes = mm || 0
		}
		return new Date(y, (m||1)-1, d||1, hours, minutes)
	}catch(e){
		return null
	}
}

export function formatRelative(date){
	if(!(date instanceof Date) || isNaN(date)) return ''
	const now = new Date()
	const diffMs = date.getTime() - now.getTime()
	const diffAbs = Math.abs(diffMs)
	const minutes = Math.round(diffAbs / 60000)
	const hours = Math.round(diffAbs / 3600000)
	const days = Math.round(diffAbs / 86400000)

	const isToday = date.toDateString() === now.toDateString()
	const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)
	const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1)

	if(isToday){
		if(minutes < 60) return diffMs >= 0 ? `in ${minutes} min` : `${minutes} min ago`
		return diffMs >= 0 ? `in ${hours} hr` : `${hours} hr ago`
	}
	if(date.toDateString() === tomorrow.toDateString()){
		return 'tomorrow'
	}
	if(date.toDateString() === yesterday.toDateString()){
		return 'yesterday'
	}
	if(days <= 7){
		return diffMs >= 0 ? `in ${days} days` : `${days} days ago`
	}
	return date.toLocaleDateString()
}


