<script lang="ts">
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import crown from '$lib/assets/crown.webp';
	import { PUBLIC_FAUCET_ADDRESS } from '$env/static/public';
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
			<span class="text-lg md:text-2xl font-bold">MonKey Faucet</span>
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
		<section class="text-center text-sm border-t border-surface-500/30 p-2 flex">
			<div class="mx-auto flex gap-x-4 justify-center">
				<a
					href="https://github.com/altugbakan/monkey-faucet"
					target="_blank"
					rel="noopener noreferrer"
					class="transition duration-300 transform hover:scale-150">
					<i class="fa-brands fa-github text-lg" />
				</a>
				<a
					href="https://creeper.banano.cc/account/{PUBLIC_FAUCET_ADDRESS}"
					target="_blank"
					rel="noopener noreferrer"
					class="transition duration-300 transform hover:scale-150">
					<i class="fa-solid fa-magnifying-glass text-lg" />
				</a>
			</div>
		</section>
	</svelte:fragment>
</AppShell>
