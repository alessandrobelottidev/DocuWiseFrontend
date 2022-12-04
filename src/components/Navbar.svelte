<script>
	// Assets
	import DocuWiseLogo from '@assets/DocuWiseLogo.png'

	// Components
	import { Link } from 'svelte-routing'

	// Logic
	import { getUser, logOut } from '@src/api'
	import { loggedIn } from '@src/stores';
</script>

<navbar
	class="navbar bg-emerald-700 fixed w-full top-0 left-0 z-10 px-4 drop-shadow-md"
>
	<div class="flex-1">
		<Link to="/" class="flex flex-row items-center">
			<img src={DocuWiseLogo} alt="DocuWise Logo" class="h-8" />
			<p class="normal-case text-xl font-medium text-white pl-2">DocuWise</p>
		</Link>
	</div>
	<div class="flex-none">
		{#if $loggedIn}
			<div class="dropdown dropdown-end pr-2">
				<Link to="/">
					<div class="btn btn-ghost btn text-white">Le tue fatture</div>
				</Link>
				<Link to="/nuovaFattura">
					<div class="btn btn-ghost btn text-white">Nuova fattura</div>
				</Link>
			</div>
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						{#await getUser() then azienda}
							<img src={azienda.urlProfilo} alt="Profile" />
						{/await}
					</div>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<Link class="active:bg-emerald-700" to="/account">Account</Link>
					</li>
					<li>
						<button class="active:bg-emerald-700" on:click={logOut}
							>Log out</button
						>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</navbar>
