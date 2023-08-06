<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;

	interface SendEvent {
		send: string;
	}

	const dispatch = createEventDispatcher<SendEvent>();
	let currentMessage = '';

	function addMessage(): void {
		if (currentMessage) {
			dispatch('send', currentMessage);
			currentMessage = '';
		}
	}

	function onPromptKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (!disabled) {
				addMessage();
			}
		}
	}
</script>

<div
	class="input-group input-group-divider focus-within:border-secondary-500 grid-cols-[1fr_auto] rounded-container-token">
	<span
		bind:innerText={currentMessage}
		class="bg-transparent border-0 ring-0 outline-none pl-2 h-fit text-left"
		placeholder="Your message..."
		contenteditable
		on:keydown={onPromptKeydown} />
	<button
		class={currentMessage ? 'variant-filled-secondary' : 'input-group-shim'}
		{disabled}
		on:click={addMessage}>
		<i class="fa-solid fa-paper-plane" />
	</button>
</div>
