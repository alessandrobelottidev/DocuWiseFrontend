<script>
	// Components
	import ErrorMessage from '@components/ErrorMessage.svelte'

	// Logic
	import { getUser } from '@src/api'
	import { loggedIn, user } from '@src/stores'

	export let sitename
</script>

<svelte:head>
	<title>Account | {sitename}</title>
</svelte:head>

<main
	style="height: calc(100vh - 6rem)"
	class="flex items-center justify-center"
>
	{#if $loggedIn && $user !== null}
		<form class="bg-white rounded-md shadow-md max-w-sm w-full">
			<div class="w-full">
				<img
					class="rounded-tr-md rounded-tl-md"
					src="https://picsum.photos/600/200"
					alt="Random background"
				/>

				<div class="rounded-full -translate-y-1/2 ml-4 -mb-14">
					<img
						class="border-4 border-white rounded-full fit-cover w-24 h-24 object-cover bg-white"
						src={$user.urlProfilo}
						alt="Profile"
					/>
				</div>

				<div class="p-4">
					<h2 class="text-lg font-medium">Dati aziendali</h2>
					<div class="pb-1">
						<div class="label pl-0 pb-0">
							<span class="label-text">Nome</span>
						</div>
						<p>{$user.nomeAzienda}</p>
					</div>
					<div class="pb-1">
						<div class="label pl-0 pb-0">
							<span class="label-text">Residenza fiscale</span>
						</div>
						<p>{$user.indirizzoResidenzaFiscale}</p>
					</div>
					<div class="pb-1">
						<div class="label pl-0 pb-0">
							<span class="label-text">Cittá di residenza</span>
						</div>
						<p>{$user.indirizzoResidenzaCitta}</p>
					</div>
					<div class="pb-1">
						<div class="label pl-0 pb-0">
							<span class="label-text">Partita IVA</span>
						</div>
						<p>{$user.pIva}</p>
					</div>
				</div>
			</div>
		</form>
	{:else}
		<ErrorMessage
			message="Devi essere registrato per poter accedere ai contenuti di questa pagina..."
		/>
	{/if}
</main>

<style>
</style>
