export const Api = {
	notifications: {
		getAll: async () => {
			return [
				{ id: 'n1', text: 'Reminder: 2pm PT appointment today', read: false },
				{ id: 'n2', text: 'Medication refill due Friday', read: false },
			]
		},
		markAllRead: async () => true,
	},
	circle: {
		create: async (name = 'Family') => {
			const inviteCode = Math.random().toString(36).slice(2, 8).toUpperCase()
			return { id: 'circle_' + inviteCode, name, inviteCode, members: ['You'] }
		},
		join: async (code) => {
			return { id: 'circle_' + code, name: 'Family', inviteCode: code.toUpperCase(), members: ['You', 'Sam'] }
		},
	},
	calendar: {
		create: async (item) => ({ ...item, id: 'a_' + Date.now() }),
		list: async () => [],
	},
	meds: {
		create: async (med) => ({ ...med, id: 'm_' + Date.now() }),
		list: async () => [],
	},
}



