<script lang="ts">
	import { MONKEY_API_URL } from '$lib/constants';

	export let address: string;
	export let host: boolean;
</script>

<img
	src="{MONKEY_API_URL}{address}"
	alt={host ? 'MonKey Faucet' : 'You'}
	class="w-16 h-12 md:w-24 md:h-16 object-cover object-center rounded-lg flex-none" />
