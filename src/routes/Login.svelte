<script>
	import { Link } from 'svelte-routing'
	import Input from '@components/Input.svelte'

	import config from '../../config.json'
	import { loggedIn } from '@src/stores'

	export let sitename

	let username
	let password

	$: if ($loggedIn) window.location.replace('/')

	const validation = (event) => {
		if (event.currentTarget.checkValidity())
			alert('Validation Passed')
		else
			event.stopPropagation()
	}

	function login() {
		if (username !== '' && password !== '') {
			fetch(`${config.API_BASE_URL}/auth`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username: username, password: password }),
				credentials: 'include',
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.loggedIn) window.location.replace('/')
				})
		}
	}
</script>

<svelte:head>
	<title>Login | {sitename}</title>
</svelte:head>

<main>
	{#if !$loggedIn}
		<div
			style="height: calc(100vh - 6rem)" 
			class="flex items-center justify-center flex-col"
		>
			<form 
				on:submit|preventDefault={validation}
				class="bg-white p-4 rounded-md shadow-md max-w-sm w-full mb-4"
			>
				<h1 class="text-2xl font-bold text-center">Accedi</h1>

				<div class="form-control w-full">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>

					<Input 
						bind:value={username}
						type="text" 
						name="username" 
						placeholder="John Doe"
						required = {true}
					/>
				</div>

				<div class="form-control w-full pb-4">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>

					<Input 
						bind:value={password}
						type="password" 
						name="password" 
						placeholder="********"
						required = {true}
					/>
				</div>

				<button type="submit" class="btn w-full" on:click={login}>Accedi</button>
			</form>
			<Link to="/register" class="link link-neutral">Nuovo al sito? Registrati</Link>
		</div>
	{/if}
</main>

<style>
</style>
