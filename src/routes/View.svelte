<script>
	import downloadSvgIcon from '../assets/icons/download.svg'
	import ErrorMessage from '../components/ErrorMessage.svelte'
	import * as htmlToImage from 'html-to-image'
	import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
	import download from 'downloadjs'

	export let id
	export let loggedIn
	export let sitename

	async function getAzienda() {
		const req = await fetch('http://localhost:3000/azienda', {
			credentials: 'include',
		})
		const data = await req.json()

		if (req.ok) {
			return JSON.parse(data.azienda)
		} else {
			throw new Error('Impossibile fare richiesta al server')
		}
	}

	async function getFattura() {
		const req = await fetch('http://localhost:3000/document/' + id, {
			credentials: 'include',
		})
		const data = await req.json()

		if (req.ok) {
			return JSON.parse(data)
		} else {
			throw new Error('Impossibile fare richiesta al server')
		}
	}

	async function downloadInvoice() {
		let invoice = document.getElementById('invoice')

		htmlToImage.toPng(invoice).then((dataUrl) => {
			download(dataUrl, 'fattura.png')
		})
	}
</script>

<svelte:head>
	<title>Fattura n° | {sitename}</title>
</svelte:head>

{#if loggedIn}
	<div class="flex justify-center">
		<div
			class="w-screen max-w-4xl bg-white shadow-md rounded-md p-8 aspect-[210/297]"
			id="invoice"
		>
			<div class="text-gray-600">
				{#await getAzienda() then azienda}
					<i class="font-serif"
						><h1 class="text-xl font-bold uppercase">{azienda.nomeAzienda}</h1>
						<p>{azienda.indirizzoResidenzaFiscale}</p>
						<p>{azienda.indirizzoResidenzaCitta}</p>
						<p class="mb-12">P.I. {azienda.pIva}</p></i
					>
				{:catch err}
					{err}
				{/await}

				<div
					class="bg-cyan-600 flex flex-row text-white py-2 px-4 mb-4 font-medium"
				>
					<p class="flex-1">Fattura N°</p>
					<p class="flex-1 text-right">30/10/22</p>
				</div>

				{#await getFattura() then fattura}
					<p class="border-b-2 border-cyan-600 pb-1 mb-4">Fatturare a</p>
					<p class="font-serif uppercase mb-2">{fattura.nominativo}</p>
					<p class="font-serif uppercase"><b>Via</b></p>
					<p class="font-serif uppercase">
						{fattura.indirizzoResidenza}
						{fattura.capResidenza}
					</p>
					<p class="font-serif uppercase mb-2">{fattura.cittaResidenza}</p>
					{#if fattura.tipo === 'azienda'}
						<p class="font-serif uppercase"><b>P.I.</b></p>
						<p class="font-serif uppercase mb-12">{fattura.pIva}</p>
					{/if}
					{#if fattura.tipo === 'privato'}
						<p class="font-serif uppercase"><b>Cod. Fiscale</b></p>
						<p class="font-serif uppercase mb-12">{fattura.codiceFiscale}</p>
					{/if}

					<div class="bg-cyan-600 flex flex-row text-white py-2 px-4 mb-4">
						<p class="flex-1 font-medium">COMPENSO PROFESSIONALE PER:</p>
					</div>

					<p class="border-b-2 font-serif border-cyan-600 pb-1 mb-6">
						{fattura.lavoroSvolto}
					</p>

					<div class="flex flex-row text-gray-800 mb-40">
						<div class="flex-[4_4_0%]">
							<p class="font-bold text-right">TOTALE</p>
						</div>
						<div class="flex-[3_3_0%]">
							<p class="font-bold text-right">{fattura.totale}€</p>
						</div>
						<div class="flex-1"><p>&nbsp;</p></div>
					</div>
				{:catch err}
					{err}
				{/await}

				<p class="font-serif">
					Operazione effettuata ex art. 1 c. 54-89 L. 190/2014 così come
					modificato dalla Legge n. 208/2015. Regime forfettario in franchigia
					di iva e non soggetta a ritenuta d'acconto - Imposta di bollo da 2
					euro assolta sull'originale per importi maggiori di 77,47 euro.
					<br /><br />
					Marca da bollo id:
				</p>
			</div>
		</div>

		<!-- Create invoice button -->
		<div class="fixed z-10 bottom-4 right-4">
			<button
				class="btn rounded-full w-12 px-0 bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-800 border-transparent hover:border-transparent focus:border-transparent"
				on:click={downloadInvoice}
			>
				<img
					src={downloadSvgIcon}
					class="h-5 w-5"
					alt="Download invoice icon"
				/>
			</button>
		</div>
	</div>
{:else}
	<ErrorMessage
		message="Devi essere registrato per poter accedere ai contenuti di questa pagina..."
	/>
{/if}
