import config from './config'

export const isLoggedIn = async () => {
	const req = await fetch(`${config.DOCUWISE_API}/auth`, {
		credentials: 'include',
	})
	const data = await req.json()

	return data.loggedIn
}

export const getUser = async () => {
	const req = await fetch(`${config.DOCUWISE_API}/accounts/me`, {
		credentials: 'include',
	})
	const data = await req.json()

	if (req.ok) {
		return data
	} else {
		throw new Error('Impossibile fare richiesta al server')
	}
}

export const getDocuments = async (startDate, endDate) => {
	const req = await fetch(
		`${config.DOCUWISE_API}/invoices/${startDate}/${endDate}`,
		{ credentials: 'include' },
	)
	const data = await req.json()

	if (req.ok) {
		if (data.length == 0) return []
		else {
			function compare(a, b) {
				if (a.numeroFattura < b.numeroFattura) return -1
				if (a.numeroFattura > b.numeroFattura) return 1
				return 0
			}

			let fatture = data
			fatture.sort(compare)
			return fatture
		}
	} else {
		throw new Error(
			"Impossibile trovare i documenti richiesti al momento, prova a ricaricare la pagina, altrimenti contatta l'amministratore...",
		)
	}
}

export const getDocument = async (id) => {
	const req = await fetch(`${config.DOCUWISE_API}/invoices/${id}`, {
		credentials: 'include',
	})
	const data = await req.json()

	if (req.ok) {
		return data
	} else {
		throw new Error('Impossibile fare richiesta al server')
	}
}

export const getNotifications = async () => {
	const req = await fetch(`${config.DOCUWISE_API}/notifications/10`, {
		credentials: 'include',
	})
	const data = await req.json()

	if (req.ok) {
		return data
	} else {
		throw new Error(data)
	}
}

export const deleteInvoice = async (id) => {
	const req = await fetch(`${config.DOCUWISE_API}/invoices/${id}`, {
		credentials: 'include',
		method: 'DELETE',
	})
}
