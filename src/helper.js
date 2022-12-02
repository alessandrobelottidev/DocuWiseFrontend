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
