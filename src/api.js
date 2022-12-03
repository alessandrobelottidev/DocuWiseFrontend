import { navigate } from 'svelte-routing'
import config from '../config.json'

export const isLoggedIn = async () => {
	const req = await fetch(`${config.API_BASE_URL}/user/isLoggedIn`, {
		credentials: 'include',
	})
	const data = await req.json()

	return data.loggedIn
}

export const getUser = async () => {
	const req = await fetch(`${config.API_BASE_URL}/user`, {
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
	const req = await fetch(`${config.API_BASE_URL}/documents`, {
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			startDate: new Date(startDate),
			endDate: new Date(endDate),
		}),
	})
	const data = await req.json()

	if (req.ok) {
		if (data.fatture.length == 0) return []
		else {
			function compare(a, b) {
				if (a.numeroFattura < b.numeroFattura) return -1
				if (a.numeroFattura > b.numeroFattura) return 1
				return 0
			}

			let fatture = JSON.parse(data.fatture)
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
	const req = await fetch(`${config.API_BASE_URL}/documents/${id}`, {
		credentials: 'include',
	})
	const data = await req.json()

	if (req.ok) {
		return JSON.parse(data)
	} else {
		throw new Error('Impossibile fare richiesta al server')
	}
}

export const logOut = async () => {
	const req = await fetch(`${config.API_BASE_URL}/user/logOut`, {
		credentials: 'include',
	})

	if (!req.ok) {
		throw new Error('Non é stato possibile con il server al momento...')
	} else {
		window.location.replace('/login')
	}
}
