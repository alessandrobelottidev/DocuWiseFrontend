<script>
	import FileSaver from 'file-saver'

	import config from '../../config.json'

	import downloadSvgIcon from '@assets/icons/download.svg'
	import backSvgIcon from '@assets/icons/back.svg'
	import deleteSvgIcon from '@assets/icons/delete.svg'
	import ErrorMessage from '@components/ErrorMessage.svelte'
	import { navigate } from 'svelte-routing'

	import { loggedIn } from '@src/stores'
  	import { deleteInvoice } from '@src/api'
	
	export let id
	export let sitename

	async function navigateBack() {
		navigate('/')
	}

	const downloadFile = async () => {
		const req = await fetch(`${config.API_BASE_URL}/invoices/download/${id}`, {
			credentials: 'include',
		})

		if (req.ok) {
			const url = await req.json()
			
			FileSaver.saveAs(url, "fattura.pdf")
		}
	}

	async function viewInvoice() {
		const req = await fetch(`${config.API_BASE_URL}/invoices/view/${id}`, {
			credentials: 'include',
		})

		if (req.ok) {
			const url = await req.json()
			return url
		} else {
			navigate('/')
		}
	}

	const deleteCard = async () => {
		deleteInvoice(id)
	}
</script>

<svelte:head>
	<title>Visualizza fattura | {sitename}</title>
</svelte:head>

{#if $loggedIn}
	<div class="flex justify-center">
		<div
			class="w-screen max-w-4xl bg-white shadow-md rounded-md aspect-[210/297]"
			id="invoice"
		>
			{#await viewInvoice()}
				Loading invoice...
			{:then url} 
				<img src={url} alt="Visualizza fattura">
			{/await}
		</div>

		<!-- Back button -->
		<div class="fixed z-10 top-18 left-4">
			<button class="btn rounded-full w-12 px-0" on:click={navigateBack}>
				<img src={backSvgIcon} class="h-5 w-5" alt="Back button icon" />
			</button>
		</div>

		<!-- Create invoice button -->
		<div class="fixed z-10 bottom-20 right-4">
			<button
				class="btn rounded-full w-12 px-0 bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-800 border-transparent hover:border-transparent focus:border-transparent"
				on:click={downloadFile}
			>
				<img
					src={downloadSvgIcon}
					class="h-5 w-5"
					alt="Download invoice icon"
				/>
			</button>
		</div>

		<!-- Delete invoice button -->
		<div class="fixed z-10 bottom-4 right-4">
			<button
				class="btn rounded-full w-12 px-0 bg-red-700 hover:bg-red-800 focus:bg-red-800 border-transparent hover:border-transparent focus:border-transparent"
				on:click={deleteCard}
			>
				<img src={deleteSvgIcon} class="h-5 w-5" alt="Delete invoice icon" />
			</button>
		</div>
	</div>
{:else}
	<ErrorMessage
		message="Devi essere registrato per poter accedere ai contenuti di questa pagina..."
	/>
{/if}
