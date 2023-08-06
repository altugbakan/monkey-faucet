<script lang="ts">
	import { DEFAULT_BUBBLE, FAUCET_ADDRESS } from '$lib/constants';
	import Prompt from '$lib/components/chat/Prompt.svelte';
	import Bubble, { type BubbleProps } from '$lib/components/chat/Bubble.svelte';
	import type { FaucetDataResponse } from './+page.server';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: FaucetDataResponse;

	let chat: HTMLElement;
	let disabled = false;
	let messageFeed: BubbleProps[] = data.bubbles ?? [DEFAULT_BUBBLE];

	function scrollChatBottom(): void {
		// Set timeout to allow for DOM to update
		setTimeout(() => {
			chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
		}, 0);
	}

	function addMessage(event: CustomEvent<string>): void {
		disabled = true;

		const userMessage: BubbleProps = {
			id: messageFeed.length,
			host: false,
			address: data.address,
			name: 'You',
			message: event.detail,
			color: 'variant-soft-secondary'
		};
		const faucetMessage: BubbleProps = {
			id: messageFeed.length + 1,
			host: true,
			address: FAUCET_ADDRESS,
			name: 'Faucet MonKey',
			color: 'variant-soft-primary'
		};
		messageFeed = [...messageFeed, userMessage];

		setTimeout(() => {
			messageFeed = [...messageFeed, faucetMessage];
			scrollChatBottom();
		}, 700);

		scrollChatBottom();

		fetch('/faucet', {
			method: 'POST',
			body: JSON.stringify({ message: event.detail, address: data.address })
		})
			.then((res) => res.json())
			.then((res) => {
				faucetMessage.message = res.message.content;
				messageFeed = [...messageFeed];
				scrollChatBottom();

				if (res.decision === true) {
					setTimeout(() => {
						goto('/faucet/success');
					}, 2000);
				} else if (res.decision === false) {
					setTimeout(() => {
						goto(`/faucet/failure`);
					}, 2000);
				} else {
					disabled = false;
				}
			});
	}

	onMount(() => {
		scrollChatBottom();
	});
</script>

<div class="mx-auto w-3/4 max-w-md space-y-4 text-center">
	<div class="grid grid-row-[1fr_auto]">
		<section bind:this={chat} class="h-[500px] p-4 overflow-y-auto space-y-4">
			{#each messageFeed as bubble}
				<Bubble {bubble} />
			{/each}
		</section>
		<section class="border-t border-surface-500/30 p-4">
			<Prompt on:send={addMessage} {disabled} />
		</section>
	</div>
</div>
