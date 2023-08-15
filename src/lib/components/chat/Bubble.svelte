<script lang="ts" context="module">
	export interface BubbleProps {
		id: number;
		host: boolean;
		address: string;
		name: string;
		message?: string;
		color: string;
	}
</script>

<script lang="ts">
	import Avatar from './Avatar.svelte';
	import Loading from './Loading.svelte';

	export let bubble: BubbleProps;
</script>

{#if bubble.host === true}
	<div class="flex flex-row gap-2">
		<Avatar address={bubble.address} host={true} />
		<div class="card p-4 rounded-tl-none space-y-2 {bubble.color}">
			<header class="flex justify-between items-center">
				<p class="font-bold">{bubble.name}</p>
			</header>
			{#if bubble.message}
				<p class="text-left">{bubble.message}</p>
			{:else}
				<Loading color={bubble.color} />
			{/if}
		</div>
	</div>
{:else}
	<div class="flex flex-row-reverse gap-2">
		<Avatar address={bubble.address} host={false} />
		<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
			<header class="flex flex-row-reverse justify-between items-center">
				<p class="font-bold">{bubble.name}</p>
			</header>
			<p class="text-left">{bubble.message}</p>
		</div>
	</div>
{/if}
