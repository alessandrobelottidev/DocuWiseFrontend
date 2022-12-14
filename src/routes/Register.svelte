<script>
	import { Link } from 'svelte-routing'
	import config from '../../config.json'

	import { loggedIn } from '@src/stores';

	export let sitename

    let usernameInput
	let emailInput
    let passwordInput
    let confirmPasswordInput

	let username
	let email
	let password
    let confirmPassword

	function login() {
		if (
			usernameInput.checkValidity() &&
			emailInput.checkValidity() &&
			passwordInput.checkValidity() &&
            confirmPasswordInput.checkValidity()
		) {
			if (username !== '' && email !== '' && password !== '' && confirmPassword !== '') {
				if (password === confirmPassword) {
					fetch(`${config.API_BASE_URL}/accounts`, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ username, email, password, confirmPassword }),
						credentials: 'include',
					})
					.then((res) => res.json())
					.then((res) => {
						console.log(res)
					})
				}
			}
		}
	}
</script>

<svelte:head>
	<title>Register | {sitename}</title>
</svelte:head>

<main>
	{#if !$loggedIn}
		<div
			style="height: calc(100vh - 6rem)"
			class="flex items-center justify-center flex-col"
		>
			<form class="bg-white p-4 rounded-md shadow-md max-w-sm w-full mb-4">
				<h1 class="text-2xl font-bold text-center">Register</h1>

				<div class="form-control w-full">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input
						bind:value={username}
                        bind:this={usernameInput}
						type="text"
						name="username"
						placeholder="John Doe"
						id="username"
						class="input w-full input-bordered max-w-sm"
						required
					/>
				</div>

				<div class="form-control w-full">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						bind:value={email}
                        bind:this={emailInput}
						type="email"
						name="email"
						placeholder="johndoe@example.com"
						id="email"
						class="input w-full input-bordered max-w-sm"
						required
					/>
				</div>

				<div class="form-control w-full">
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

                <div class="form-control w-full pb-4">
					<label class="label" for="password">
						<span class="label-text">Confirm password</span>
					</label>
					<input
						bind:value={confirmPassword}
                        bind:this={confirmPasswordInput}
						type="password"
						name="confirmPassword"
						placeholder="********"
						id="confirmPassword"
						class="input w-full input-bordered max-w-sm"
						required
					/>
				</div>

				<button type="button" class="btn w-full" on:click={login}>Login</button>
			</form>
            <Link to="/login" class="link link-neutral">Already registered?</Link>
		</div>
	{/if}
</main>

<style>
</style>
