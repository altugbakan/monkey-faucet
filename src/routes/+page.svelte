<script lang="ts">
	import { goto } from '$app/navigation';
	import { BANANO_REGEX, FAUCET_ADDRESS, MONKEY_API_URL } from '$lib/constants';

	let value: string = '';
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
		goto(`/faucet?address=${value}`);
	}

	function onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter' && !disabled) {
			event.preventDefault();
			redirect();
		}
	}
</script>

<div class="mx-auto w-3/4 max-w-md space-y-4 text-center">
	<img src="{MONKEY_API_URL}{FAUCET_ADDRESS}" alt="Faucet MonKey" class="max-w-md aspect-square" />
	<h1
		class="h1 dark:bg-gradient-to-br dark:from-primary-500 dark:to-secondary-300 dark:bg-clip-text dark:text-transparent dark:box-decoration-clone">
		Welcome to MonKey Faucet!
	</h1>
	<section class="border-t border-surface-500/30 p-4">
		<label for="address" class="label text-left ml-2">Enter your Banano address to continue</label>
		<div
			class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-base invalid:input-error"
			class:input-error={invalid}
			class:input-success={!disabled}>
			<input
				bind:value
				on:focus={onFocus}
				on:blur={onBlur}
				on:keydown={onKeydown}
				class="bg-transparent border-0 ring-0 outline-none px-2"
				name="address"
				id="address"
				placeholder="ban_1xred...sw" />
			<button on:click={redirect} {disabled} class="btn variant-filled-primary">
				<i class="fa-solid fa-arrow-right" />
			</button>
		</div>
	</section>
</div>
