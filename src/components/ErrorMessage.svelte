<script>
	import reloadIcon from '@assets/icons/reload.svg'

	export let message

	function reloadPage() {
		window.location.replace(
			window.location.protocol + '//' + window.location.host,
		)
	}
</script>

<p class="pb-4">
	<span class="font-bold text-red-600">Errore: </span>
	{message}
</p>
<button
	class="btn bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-800 border-transparent hover:border-transparent focus:border-transparent w-max"
	on:click={reloadPage}
>
	<img class="h-5 mr-2" src={reloadIcon} alt="Ricarica pagina" />
	Ricarica pagina
</button>
