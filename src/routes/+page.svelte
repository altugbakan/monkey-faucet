<script lang="ts" context="module">
	declare global {
		interface Window {
			grecaptcha: any;
		}
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PUBLIC_FAUCET_ADDRESS, PUBLIC_CAPTCHA_SITE_KEY } from '$env/static/public';
	import { BANANO_REGEX, MONKEY_API_URL } from '$lib/constants';

	let value = '';
	let isFocused = false;

	$: disabled = !BANANO_REGEX.test(value);
	$: invalid = value.length > 0 && !isFocused && disabled;

	function onFocus() {
		isFocused = true;
	}

	function onBlur() {
		isFocused = false;
	}

	function redirect() {
		if (!browser) {
			return;
		}

		window.grecaptcha.ready(function () {
			window.grecaptcha
				.execute(PUBLIC_CAPTCHA_SITE_KEY, { action: 'submit' })
				.then(function (token: string) {
					goto(`/faucet?address=${value}&token=${token}`);
				});
		});
	}

	function onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter' && !disabled) {
			event.preventDefault();
			redirect();
		}
	}
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_CAPTCHA_SITE_KEY}"
		async
		defer></script>
</svelte:head>

<div class="mx-auto w-3/4 max-w-md space-y-4 text-center">
	<section>
		<img
			src="{MONKEY_API_URL}{PUBLIC_FAUCET_ADDRESS}"
			alt="Faucet MonKey"
			class="max-w-xs mx-auto aspect-square" />
		<h1
			class="text-3xl dark:bg-gradient-to-br dark:from-primary-500 dark:to-secondary-300 dark:bg-clip-text dark:text-transparent dark:box-decoration-clone">
			Welcome to MonKey Faucet!
		</h1>
	</section>
	<section class="border-t border-surface-500/30 p-4">
		<label for="address" class="label text-left ml-2 mb-1 text-sm sm:text-lg">
			Enter your Banano address to continue
		</label>
		<div
			class="input-group flex rounded-container-base"
			class:variant-soft-error={invalid}
			class:variant-soft-success={!disabled}>
			<input
				bind:value
				on:focus={onFocus}
				on:blur={onBlur}
				on:keydown={onKeydown}
				class="bg-transparent min-w-0 border-0 ring-0 outline-none px-2 flex-1"
				name="address"
				id="address"
				placeholder="ban_1xred...sw" />
			<button on:click={redirect} {disabled} class="btn variant-filled-primary flex-none">
				<i class="fa-solid fa-arrow-right" />
			</button>
		</div>
	</section>
	<!-- prettier-ignore -->
	<footer>
		No Banano address? You can grab a wallet
		<a
			class="text-primary-700 dark:text-primary-500 hover:underline"
			href="https://banano.cc/#wallets"
			target="_blank"
			rel="noopener">
			here</a>.
	</footer>
</div>
