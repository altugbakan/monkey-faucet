<script lang="ts">
	import { PUBLIC_FAUCET_ADDRESS } from '$env/static/public';
	import qrCode from '$lib/assets/qrcode.svg';

	export let data;
</script>

<div class="h-full m-auto max-w-lg text-center flex flex-col align-middle justify-center gap-8">
	<section class="mx-auto gap-4 max-w-lg">
		<h1
			class="h1 pb-2 bg-gradient-to-br from-primary-700 to-secondary-600 dark:from-primary-500 dark:to-secondary-600 bg-clip-text text-transparent">
			You have claimed your Banano successfully!
		</h1>
		<h2 class="h2">Thank you for using the MonKey Faucet!</h2>
	</section>
	<section class="border-t border-surface-500/30 p-4 flex flex-col gap-4">
		<img src={qrCode} alt="Donation QR Code" class="aspect-square w-40 mx-auto" />
		<p class="text-xs break-all">{PUBLIC_FAUCET_ADDRESS}</p>
		<h3 class="h3">
			You can donate to the faucet using the QR code above to increase the rewards and keep it
			running.
		</h3>
		<div class="flex flex-col">
			<span>Faucet Balance: {data.balance.toFixed(2)} Bananos</span>
			<span>Current Reward: {data.reward.toFixed(2)} Banano{data.reward === 1 ? '' : 's'}</span>
		</div>
	</section>
</div>
