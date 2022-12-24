<script>
	import { Link, navigate } from 'svelte-routing'
	import Input from '@components/Input.svelte'
	
	import config from '../config'
	import { loggedIn } from '@src/stores'

	export let sitename

	let username
	let email
	let password
    let confirmPassword

	const validation = (event) => {
		event.preventDefault()

		if (event.currentTarget.checkValidity()) {
			if (register())
				navigate('/login')
		}
	}

	const register = async () => {
		if (username !== '' && email !== '' && password !== '' && confirmPassword !== '') {
			if (password === confirmPassword) {
				const res = await fetch(`${config.DOCUWISE_API}/accounts`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username, email, password, confirmPassword }),
					credentials: 'include',
				})

				if (res.ok) return true
				else return false
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
			<form 
				on:submit|preventDefault={validation}	
				class="bg-white p-4 rounded-md shadow-md max-w-sm w-full mb-4"
			>
				<h1 class="text-2xl font-bold text-center">Registrati</h1>

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

				<div class="form-control w-full">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>

					<Input 
						bind:value={email}
						type="email" 
						name="email" 
						placeholder="johndoe@example.com"
						required = {true}
					/>
				</div>

				<div class="form-control w-full">
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

				<div class="form-control w-full pb-4">
					<label class="label" for="confirmPassword">
						<span class="label-text">Conferma password</span>
					</label>

					<Input 
						bind:value={confirmPassword}
						type="password" 
						name="confirmPassword" 
						placeholder="********"
						required = {true}
					/>
				</div>

				<button type="submit" class="btn w-full">Registrati</button>
			</form>
            <Link to="/login" class="link link-neutral">Giá registrato? Accedi</Link>
		</div>
	{/if}
</main>

<style>
</style>
