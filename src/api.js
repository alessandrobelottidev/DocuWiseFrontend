import { navigate } from 'svelte-routing'
import config from '../config.json'

export const isLoggedIn = async () => {
	const req = await fetch(`${config.API_BASE_URL}/auth`, {
		credentials: 'include',
	})
	const data = await req.json()

	return data.loggedIn
}

export const getUser = async () => {
	const req = await fetch(`${config.API_BASE_URL}/accounts/me`, {
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
		`${config.API_BASE_URL}/invoices/${startDate}/${endDate}`,
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
	const req = await fetch(`${config.API_BASE_URL}/invoices/${id}`, {
		credentials: 'include',
	})
	const data = await req.json()

	if (req.ok) {
		return data
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
