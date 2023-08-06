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
	import { MONKEY_API_URL } from '$lib/constants';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Loading from './Loading.svelte';

	export let bubble: BubbleProps;
</script>

{#if bubble.host === true}
	<div class="grid grid-cols-[auto_1fr] gap-2">
		<Avatar src="{MONKEY_API_URL}{bubble.address}" initials="FM" width="w-12" />
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
	<div class="grid grid-cols-[1fr_auto] gap-2">
		<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
			<header class="flex flex-row-reverse justify-between items-center">
				<p class="font-bold">{bubble.name}</p>
			</header>
			<p class="text-left">{bubble.message}</p>
		</div>
		<Avatar src="{MONKEY_API_URL}{bubble.address}" initials="cm" width="w-12" />
	</div>
{/if}
