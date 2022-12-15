<script>
	// Components
	import ErrorMessage from '@components/ErrorMessage.svelte'
    import Input from '@components/Input.svelte';

	// Logic
	import config from '../../config.json'
	import { loggedIn, user } from '@src/stores'

	export let sitename

	let nomeAzienda
    let indirizzoResidenzaFiscale
    let indirizzoResidenzaCitta
    let pIva
    let urlProfilo

	const validation = (event) => {
		event.preventDefault()

		if (event.currentTarget.checkValidity())
			updateAccount()
	}
	
	const updateAccount = async () => {
		if (
			nomeAzienda !== '' &&
            indirizzoResidenzaFiscale !== '' &&
            indirizzoResidenzaCitta !== '' &&
            pIva !== '' &&
            urlProfilo !== ''
		) {
			const req = await fetch(`${config.API_BASE_URL}/accounts/update`, {
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'PATCH',
				body: JSON.stringify({
					nomeAzienda,
                    indirizzoResidenzaFiscale,
                    indirizzoResidenzaCitta,
                    pIva,
                    urlProfilo,
				}),
			})

			if (req.ok) {
				$user.nomeAzienda = nomeAzienda
				$user.indirizzoResidenzaFiscale = indirizzoResidenzaFiscale
				$user.indirizzoResidenzaCitta = indirizzoResidenzaCitta
				$user.pIva = pIva
				$user.urlProfilo = urlProfilo
			}
		}
	}
</script>

<svelte:head>
	<title>Modifica account | {sitename}</title>
</svelte:head>

<div
	style="height: calc(100vh - 6rem)"
	class="flex items-center justify-center"
>
	{#if $loggedIn}
		<form
			on:submit|preventDefault={validation}
			class="bg-white rounded-md shadow-md max-w-sm md:max-w-2xl xl:max-w-3xl w-full p-4 pb-6 overflow-y-auto overflow-x-hidden"
			style="max-height: calc(100vh - 6rem)"
		>
			<h1 class="text-2xl font-bold text-center mb-4">Modifica account</h1>

			<div class="w-full gap-x-4 gap-y-2 grid grid-cols-2 mb-4">
				<div class="form-control w-full ">
					<label class="label" for="nomeAzienda">
						<span class="label-text">Nome azienda</span>
					</label>

                    <Input
                        bind:value={nomeAzienda}
                        type="text"
                        name="nomeAzienda"
                        placeholder="Nome S.R.L."
                        required={true}
                    />
				</div>

				<div class="form-control w-full ">
					<label class="label" for="indirizzoResidenzaFiscale">
						<span class="label-text">Indirizzo residenza fiscale</span>
					</label>

                    <Input
                        bind:value={indirizzoResidenzaFiscale}
                        type="text"
                        name="indirizzoResidenzaFiscale"
                        placeholder="Via verdi 10"
                        required={true}
                    />
				</div>

				<div class="form-control w-full ">
					<label class="label" for="indirizzoResidenzaCitta">
						<span class="label-text">Indirizzo residenza cittá</span>
					</label>

                    <Input
                        bind:value={indirizzoResidenzaCitta}
                        type="text"
                        name="indirizzoResidenzaCitta"
                        placeholder="Brescia"
                        required={true}
                    />
				</div>

				<div class="form-control w-full ">
					<label class="label" for="pIva">
						<span class="label-text">Partita Iva</span>
					</label>

                    <Input
                        bind:value={pIva}
                        type="number"
                        name="pIva"
                        placeholder="123456789"
                        required={true}
                    />
				</div>

				<div class="form-control w-full ">
					<label class="label" for="urlProfilo">
						<span class="label-text">Url immagine profilo</span>
					</label>

                    <Input
                        bind:value={urlProfilo}
                        type="url"
                        name="urlProfilo"
                        placeholder="https://www.google.com"
                        required={true}
                    />
				</div>
			</div>

			<button type="submit" class="btn w-full">
				Modifica account
			</button>
		</form>
	{:else}
		<ErrorMessage
			message="Devi essere registrato per poter accedere ai contenuti di questa pagina..."
		/>
	{/if}
</div>

<style>
</style>
