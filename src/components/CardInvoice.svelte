<script>
	import FileSaver from 'file-saver'

	import config from '../../config.json'
	import { deleteInvoice } from '@src/api'

	import viewSvgIcon from '@assets/icons/view.svg'
	import editSvgIcon from '@assets/icons/edit.svg'
	import downloadSvgIcon from '@assets/icons/download.svg'
	import deleteSvgIcon from '@assets/icons/delete.svg'

	export let id
	export let nominativo
	export let pIva
	export let data
	export let totale
	export let numeroFattura

	function padTo2Digits(num) {
		return num.toString().padStart(2, '0')
	}

	function formatDate(date) {
		return [
			padTo2Digits(date.getDate()),
			padTo2Digits(date.getMonth() + 1),
			date.getFullYear(),
		].join('/')
	}

	let formattedDate = formatDate(new Date(data))

	function view() {
		window.location.replace('/view/' + id)
	}

	const deleteCard = async () => {
		deleteInvoice(id)
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
</script>

<div class="rounded-md drop-shadow-sm bg-white p-4 h-max">
	<h2 class="text-lg font-medium mb-1">Fattura N° {numeroFattura}</h2>
	<p class="text-sm mb-1">
		<b>A:</b>
		{nominativo}
	</p>
	<p class="text-sm mb-1"><b>P.IVA:</b> {pIva}</p>
	<p class="text-sm mb-1"><b>Data:</b> {formattedDate}</p>
	<p class="text-sm mb-4"><b>Totale:</b> {totale}€</p>

	<div class="grid gap-2 grid-cols-3">
		<div class="tooltip tooltip-bottom" data-tip="VISUALIZZA">
			<button class="btn w-full" on:click={view}>
				<img src={viewSvgIcon} class="h-5" alt="Icona visualizza" />
			</button>
		</div>

		<!--<div class="tooltip tooltip-bottom" data-tip="MODIFICA">
			<div class="btn w-full">
				<img src={editSvgIcon} class="h-5" alt="Icona modifica" />
			</div>
		</div>-->

		<div class="tooltip tooltip-bottom" data-tip="SCARICA">
			<button
				class="btn bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-800 border-transparent hover:border-transparent focus:border-transparent w-full"
				on:click={downloadFile}
			>
				<img src={downloadSvgIcon} class="h-5" alt="Icona download" />
			</button>
		</div>

		<div class="tooltip tooltip-bottom" data-tip="ELIMINA">
			<button
				class="btn bg-red-700 hover:bg-red-800 focus:bg-red-800 border-transparent hover:border-transparent focus:border-transparent w-full"
				on:click={deleteCard}
			>
				<img src={deleteSvgIcon} class="h-5" alt="Icona elimina" />
			</button>
		</div>
	</div>
</div>
