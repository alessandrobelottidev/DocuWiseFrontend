export const isLoggedIn = async () => {
	const req = await fetch('http://localhost:3000/loggedIn', {
		credentials: 'include',
	})
	const data = await req.json()

	return data.loggedIn
}

export const getAzienda = async () => {
	const req = await fetch('http://localhost:3000/azienda', {
		credentials: 'include',
	})
	const data = await req.json()

	if (req.ok) {
		return JSON.parse(data.azienda)
	} else {
		throw new Error('Impossibile fare richiesta al server')
	}
}

export const getDocuments = async (startDate, endDate) => {
	const req = await fetch('http://localhost:3000/documents', {
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify({startDate, endDate})
	})
	const data = await req.json()

	if (req.ok) {
		if (data.fatture.length == 0) return []
		else return JSON.parse(data.fatture)
	} else {
		throw new Error(
			"Impossibile trovare i documenti richiesti al momento, prova a ricaricare la pagina, altrimenti contatta l'amministratore...",
		)
	}
}