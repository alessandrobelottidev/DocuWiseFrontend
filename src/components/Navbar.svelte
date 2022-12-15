<script>
	// Assets
	import DocuWiseLogo from '@assets/DocuWiseLogo.png'
	import notificationsIcon from '@assets/icons/notifications.svg'
	import notificationsActiveIcon from '@assets/icons/notifications-active.svg'

	// Components
	import { onMount } from 'svelte'
	import { Link, navigate } from 'svelte-routing'
	import Notification from '@components/Notification.svelte'

	// Logic
	import config from '../../config.json'
	import { getUser, getNotifications } from '@src/api'
	import { loggedIn, unreadNotifications, notifications } from '@src/stores'

	$: {
		$unreadNotifications = 0
		$notifications.forEach((notification) => {
			if (!notification.read) $unreadNotifications++
		})
	}

	onMount(async () => {
        $notifications = await getNotifications()
    })

	const logOut = async () => {
		const req = await fetch(`${config.API_BASE_URL}/auth`, {
			credentials: 'include',
			method: 'DELETE',
		})

		$loggedIn = false
		navigate('/login', { replace: true })

		if (!req.ok) {
			throw new Error('Non é stato possibile con il server al momento...')
		}
	}
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
					<div class="w-6 rounded-full">
						{#if $unreadNotifications > 0}
							<img src={notificationsActiveIcon} alt="Notifications icon">
						{:else}
							<img src={notificationsIcon} alt="Notifications icon">
						{/if}
						
					</div>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				{#if $notifications.length > 0}
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box max-w-[240px] w-screen"
					>
						{#each $notifications as notification}
							<Notification {notification} id={notification.id} />
						{/each}
					</ul>
				{:else}
					<li>
						<div class="hover:bg-white active:bg-white active:text-black">
							<p class="text-center">Non hai notifiche</p>
						</div>
					</li>
				{/if}
			</div>

			<!-- Profile -->
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
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box  max-w-[100px] w-screen"
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
