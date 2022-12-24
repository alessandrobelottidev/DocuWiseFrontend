<script>
	import { onMount } from 'svelte'
	import { Router, Route } from 'svelte-routing'
	import Navbar from '@components/Navbar.svelte'

	import Login from '@routes/Login.svelte'
	import Register from '@routes/Register.svelte'
	import Invoices from '@routes/Invoices.svelte'
	import CreateInvoice from '@routes/createInvoice.svelte'
	import Account from '@routes/Account.svelte'
	import UpdateAccount from '@routes/UpdateAccount.svelte'
	import View from '@routes/View.svelte'
	import NotFound from '@routes/NotFound.svelte'

	import { isLoggedIn, getUser, getNotifications } from '@src/api'
	import { loggedIn, user, notifications } from '@src/stores'

	const sitename = 'DocuWise'

	onMount(async () => {
		let temp = await isLoggedIn()
		
		if (temp) {
			$loggedIn = true
			$user = await getUser()
			$notifications = await getNotifications()
		} else {
			if (window.location.pathname !== '/register')
				if (window.location.pathname !== '/login')
					window.location.replace('/login')
		}
	})

	export let url = ''
</script>

<Router {url}>
	<Navbar />
	<main class="bg-slate-100 h-screen pt-20 pb-1 px-2 md:pb-4 md:px-4 overflow-x-hidden">
		<Route path="/view/:id" let:params>
			<View id={params.id} {sitename} />
		</Route>

		<Route path="/login">
			<Login {sitename} />
		</Route>

		<Route path="/register">
			<Register {sitename} />
		</Route>

		<Route path="/account">
			<Account {sitename} />
		</Route>

		<Route path="/update-account">
			<UpdateAccount {sitename} />
		</Route>

		<Route path="/nuovaFattura">
			<CreateInvoice {sitename} />
		</Route>

		<Route path="/fatture">
			<Invoices {sitename} />
		</Route>

		<Route path="/">
			<Invoices {sitename} />
		</Route>

		<Route component={NotFound} />
	</main>
</Router>

<style>
</style>
