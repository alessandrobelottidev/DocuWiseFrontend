<script>
	import { Link } from 'svelte-routing'

	import config from '../../config.json'
	import { loggedIn } from '@src/stores';

	export let sitename

	let usernameInput
	let passwordInput

	let username
	let password

	$: if ($loggedIn) window.location.replace('/')

	function login() {
		if (
			usernameInput.checkValidity() &&
			passwordInput.checkValidity()
		) {
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
			<form class="bg-white p-4 rounded-md shadow-md max-w-sm w-full mb-4">
				<h1 class="text-2xl font-bold text-center">Login</h1>

				<div class="form-control w-full">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input
						bind:value={username}
						bind:this={usernameInput}
						type="text"
						name="username"
						placeholder="John doe"
						id="username"
						class="input w-full input-bordered max-w-sm"
						required
					/>
				</div>

				<div class="form-control w-full pb-4">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						bind:value={password}
						bind:this={passwordInput}
						type="password"
						name="password"
						placeholder="********"
						id="password"
						class="input w-full input-bordered max-w-sm"
						required
					/>
				</div>

				<button type="button" class="btn w-full" on:click={login}>Login</button>
			</form>
			<Link to="/register" class="link link-neutral">New to the site? Register</Link>
		</div>
	{/if}
</main>

<style>
</style>
