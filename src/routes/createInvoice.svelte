<script>
	// Assets
	import documentPlusIcon from '../assets/icons/document-plus.svg'

	// Components
	import ErrorMessage from '../components/ErrorMessage.svelte'

	// Logic

	export let loggedIn
	export let sitename

	let nominativo
	let data
	let indirizzoResidenza
	let capResidenza
	let cittaResidenza
	let pIva
	let codFiscale
	let tipo
	let lavoroSvolto
	let totale
	let temaPredefinito
</script>

<svelte:head>
	<title>Nuova fattura | {sitename}</title>
</svelte:head>

<main
	style="height: calc(100vh - 6rem)"
	class="flex items-center justify-center"
>
	{#if loggedIn}
		<form
			class="bg-white rounded-md shadow-md max-w-sm md:max-w-2xl xl:max-w-3xl w-full p-4 pb-6 overflow-y-auto overflow-x-hidden"
			style="max-height: calc(100vh - 6rem)"
		>
			<h1 class="text-2xl font-bold text-center mb-4">Nuova fattura</h1>

			<div class="w-full gap-x-4 gap-y-2 grid grid-cols-2 mb-4">
				<!-- Nominativo -->
				<div class="form-control w-full ">
					<label class="label" for="nominativo">
						<span class="label-text">Nominativo</span>
					</label>
					<input
						bind:value={nominativo}
						type="text"
						name="nominativo"
						placeholder="Nome S.R.L."
						id="nominativo"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- Data -->
				<div class="form-control w-full ">
					<label class="label" for="data">
						<span class="label-text">Data</span>
					</label>
					<input
						bind:value={data}
						type="date"
						name="data"
						id="data"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- Indirizzo residenza -->
				<div class="form-control w-full ">
					<label class="label" for="indirizzoResidenza">
						<span class="label-text">Indirizzo residenza</span>
					</label>
					<input
						bind:value={indirizzoResidenza}
						type="text"
						name="indirizzoResidenza"
						placeholder="Via Gallo, 21"
						id="indirizzoResidenza"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- CAP residenza -->
				<div class="form-control w-full ">
					<label class="label" for="capResidenza">
						<span class="label-text">CAP residenza</span>
					</label>
					<input
						bind:value={capResidenza}
						type="text"
						name="capResidenza"
						placeholder="20302"
						id="capResidenza"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- Citta residenza -->
				<div class="form-control w-full ">
					<label class="label" for="cittaResidenza">
						<span class="label-text">Cittá residenza</span>
					</label>
					<input
						bind:value={cittaResidenza}
						type="text"
						name="cittaResidenza"
						placeholder="Milano (MI)"
						id="cittaResidenza"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- Partita IVA -->
				<div class="form-control w-full ">
					<label class="label" for="pIva">
						<span class="label-text">Partita IVA</span>
					</label>
					<input
						bind:value={pIva}
						type="text"
						name="pIva"
						placeholder="11111111111"
						id="pIva"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- Codice fiscale -->
				<div class="form-control w-full ">
					<label class="label" for="codFiscale">
						<span class="label-text">Codice fiscale</span>
					</label>
					<input
						bind:value={codFiscale}
						type="text"
						name="codFiscale"
						placeholder="BLTLSN04B157S"
						id="codFiscale"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- Tipo -->
				<div class="form-control w-full ">
					<label class="label" for="tipo">
						<span class="label-text">Tipo cliente</span>
					</label>
					<select
						class="select w-full input-bordered "
						bind:value={tipo}
						name="tipo"
						id="tipo"
						required
					>
						<option disabled selected>Scegli il tipo di cliente</option>
						<option>Azienda</option>
						<option>Privato</option>
					</select>
				</div>

				<!-- Lavoro svolto -->
				<div class="form-control w-full ">
					<label class="label" for="lavoroSvolto">
						<span class="label-text">Lavoro svolto</span>
					</label>
					<input
						bind:value={lavoroSvolto}
						type="text"
						name="lavoroSvolto"
						placeholder="Lavorazioni eseguite per i vostri clienti..."
						id="lavoroSvolto"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- Totale -->
				<div class="form-control w-full ">
					<label class="label" for="totale">
						<span class="label-text">Totale fattura (€)</span>
					</label>
					<input
						bind:value={totale}
						type="number"
						name="totale"
						placeholder="1000"
						id="totale"
						class="input w-full input-bordered "
						required
					/>
				</div>

				<!-- Tema predefinito -->
				<div class="form-control w-full ">
					<label class="label" for="temaPredefinito">
						<span class="label-text">Tema predefinito</span>
					</label>
					<select
						class="select w-full input-bordered "
						bind:value={temaPredefinito}
						name="temaPredefinito"
						id="temaPredefinito"
						required
					>
						<option disabled selected>Scegli il tema predefinito</option>
						<option>Base</option>
					</select>
				</div>
			</div>

			<button type="button" class="btn w-full">
				<img
					src={documentPlusIcon}
					class="h-5 mr-2"
					alt="Icona aggiungi documento"
				/>
				Crea fattura
			</button>
		</form>
	{:else}
		<ErrorMessage
			message="Devi essere registrato per poter accedere ai contenuti di questa pagina..."
		/>
	{/if}
</main>

<style>
</style>
