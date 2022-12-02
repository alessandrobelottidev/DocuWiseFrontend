<script>
	import addSvgIcon from '../assets/icons/add.svg'
	import CardInvoice from '../components/CardInvoice.svelte'
	import ErrorMessage from '../components/ErrorMessage.svelte'
	import { Link } from 'svelte-routing'

	export let loggedIn
	export let sitename

	async function getDocuments() {
		const req = await fetch('http://localhost:3000/documents', {
			credentials: 'include',
		})
		const data = await req.json()

		if (req.ok) {
			return JSON.parse(data.fatture)
		} else {
			throw new Error(
				"Impossibile trovare i documenti richiesti al momento, prova a ricaricare la pagina, altrimenti contatta l'amministratore...",
			)
		}
	}

	//let documents = getDocuments()
</script>

<svelte:head>
	<title>Le mie fatture | {sitename}</title>
</svelte:head>

<div>
	<h1 class="text-2xl font-bold pb-4">Le tue fatture</h1>

	<!-- Filters -->
	<form action="#" class="flex flex-row items-end pb-4 gap-2">
		<div class="form-control">
			<label class="label" for="startDate">
			  <span class="label-text">Data inizio</span>
			</label>
			<input type="date" name="startDate" class="input drop-shadow-sm w-full max-w-[200px]" />
		</div>
		
		<div class="form-control">
			<label class="label" for="endDate">
			  <span class="label-text">Data fine</span>
			</label>
			<input type="date" name="endDate" class="input drop-shadow-sm w-full max-w-[200px]" />
		</div>

		<div class="btn">FILTRA</div>

		<div class="btn btn-ghost"></div>
	</form>

	<div>
		{#if loggedIn}
			{#await getDocuments()}
				Caricando le tue fatture...
			{:then fatture}
					<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
						{#each fatture as fattura}
							<CardInvoice
								id={fattura.id}
								nominativo={fattura.nominativo}
								pIva={fattura.pIva}
								data={fattura.data}
								totale={fattura.totale}
								numeroFattura={fattura.numeroFattura}
							/>
						{/each}
					</div>
			{:catch err}
				<ErrorMessage message={err.message} />
			{/await}
		{:else}
			<ErrorMessage
				message="Devi essere registrato per poter accedere ai contenuti di questa pagina..."
			/>
		{/if}
	</div>

	<!-- Create invoice button -->
	<div class="fixed z-10 bottom-4 right-4 drop-shadow-lg">
		<Link to="/nuovaFattura">
			<div
				class="btn rounded-full w-12 px-0 bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-800 border-transparent hover:border-transparent focus:border-transparent"
			>
				<img src={addSvgIcon} class="h-5 w-5" alt="Create invoice icon" />
			</div>
		</Link>
	</div>
</div>

<style>
</style>
