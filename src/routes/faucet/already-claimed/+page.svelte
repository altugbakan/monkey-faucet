<script lang="ts">
	import Home from '$lib/components/Home.svelte';
</script>

<div class="m-auto max-w-lg h-full text-center flex flex-col align-middle justify-center gap-4">
	<h1
		class="h1 pb-2 bg-gradient-to-br from-error-500 to-warning-600 bg-clip-text text-transparent box-decoration-clone">
		You have already claimed your Banano for today!
	</h1>
	<h2 class="h2">Come back tomorrow for more.</h2>
	<Home />
</div>
