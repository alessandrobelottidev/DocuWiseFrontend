<script>
	import { Router, Route } from 'svelte-routing'
	import Navbar from '@components/Navbar.svelte'

	import Login from '@routes/Login.svelte'
	import Invoices from '@routes/Invoices.svelte'
	import CreateInvoice from '@routes/createInvoice.svelte'
	import Account from '@routes/Account.svelte'
	import View from '@routes/View.svelte'
	import NotFound from '@routes/NotFound.svelte'

	import { isLoggedIn } from '@src/api'

	const sitename = 'DocuWise'
	let loggedIn = false

	isLoggedIn().then((res) => {
		if (!res) {
			if (window.location.pathname !== '/login')
				window.location.replace('/login')
		} else {
			loggedIn = true
		}
	})

	export let url = ''
</script>

<Router {url}>
	<Navbar {loggedIn} />
	<main class="bg-slate-100 h-screen pt-20 pb-4 px-4 overflow-x-hidden">
		<Route path="/view/:id" let:params>
			<View id={params.id} {loggedIn} {sitename} />
		</Route>

		<Route path="/login">
			<Login {loggedIn} {sitename} />
		</Route>

		<Route path="/account">
			<Account {loggedIn} {sitename} />
		</Route>

		<Route path="/nuovaFattura">
			<CreateInvoice {loggedIn} {sitename} />
		</Route>

		<Route path="/fatture">
			<Invoices {loggedIn} {sitename} />
		</Route>

		<Route path="/">
			<Invoices {loggedIn} {sitename} />
		</Route>

		<Route component={NotFound} />
	</main>
</Router>

<style>
</style>
