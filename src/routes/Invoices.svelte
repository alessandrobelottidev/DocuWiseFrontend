<script>
	import dayjs from 'dayjs'

	import addSvgIcon from '../assets/icons/add.svg'
	import CardInvoice from '../components/CardInvoice.svelte'
	import ErrorMessage from '../components/ErrorMessage.svelte'
	import { Link } from 'svelte-routing'

	import { getDocuments } from '../helper'
	import { onMount } from 'svelte'

	export let loggedIn
	export let sitename

	function padTo2Digits(num) {
		return num.toString().padStart(2, '0')
	}

	function formatDate(date) {
		return [
			date.getFullYear(),
			padTo2Digits(date.getMonth() + 1),
			padTo2Digits(date.getDate()),
		].join('-')
	}

	let startDate
	let endDate
	let documents = []

	$: console.log(documents)
	$: console.log('Start date:', startDate)
	$: console.log('End date:', endDate)

	function getFirstDayOfMonth(year, month) {
		return new Date(year, month, 1)
	}

	onMount(() => {
		startDate = `${dayjs().year()}-${dayjs().month() + 1}-01`

		endDate = `${dayjs().year()}-${dayjs().month() + 1}-${dayjs()
			.endOf('month')
			.date()}`

		documents = getDocuments(startDate, endDate.replace('T', ' '))
	})

	const filterDocuments = () => {
		if (startDate !== '' && endDate !== '')
			if (!dayjs(startDate).isAfter(endDate))
				documents = documents = getDocuments(startDate, endDate)
	}
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
			<input
				type="date"
				name="startDate"
				class="input drop-shadow-sm w-full max-w-[200px]"
				bind:value={startDate}
			/>
		</div>

		<div class="form-control">
			<label class="label" for="endDate">
				<span class="label-text">Data fine</span>
			</label>
			<input
				type="date"
				name="endDate"
				class="input drop-shadow-sm w-full max-w-[200px]"
				bind:value={endDate}
			/>
		</div>

		<button type="button" class="btn" on:click={filterDocuments}>FILTRA</button>
	</form>

	<div>
		{#if loggedIn}
			{#await documents}
				Caricando le tue fatture...
			{:then fatture}
				<div
					class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
				>
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
