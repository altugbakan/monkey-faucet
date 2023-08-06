<script lang="ts">
	export let color: string;
</script>

<div class="flex justify-center">
	<div class="inline-flex gap-1">
		<div class="w-2 h-2 {color} rounded-full animate-bounce" />
		<div class="w-2 h-2 {color} rounded-full animate-bounce" />
		<div class="w-2 h-2 {color} rounded-full animate-bounce" />
	</div>
</div>
