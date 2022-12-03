<script>
	import backIcon from '@assets/icons/back.svg'

	function goToHomepage() {
		window.location.replace('/')
	}
</script>

<h1 class="text-2xl font-bold text-center mb-4">
	<span class="text-red-600">Error 404</span> <br />
	Pagina non trovata...
</h1>
<div class="flex items-center flex-col">
	<button
		class="btn bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-800 border-transparent hover:border-transparent focus:border-transparent w-max"
		on:click={goToHomepage}
	>
		<img class="h-5 mr-2" src={backIcon} alt="Ricarica pagina" />
		Torna alla homepage
	</button>
</div>
