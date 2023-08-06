<script lang="ts">
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import crown from '$lib/assets/crown.webp';
</script>

<svelte:head>
	<title>MonKey Faucet</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="transition duration-300 hover:scale-125">
					<img
						src={crown}
						alt="MonKey Faucet Logo"
						class="aspect-square w-8 text-primary-700 dark:text-primary-500" />
				</a>
			</svelte:fragment>
			<span class="text-2xl font-bold">MonKey Faucet</span>
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
