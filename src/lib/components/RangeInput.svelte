<script lang="ts">
	export let value: number;
	export let min: number = 0;
	export let max: number = 100;
	export let unit: string = 'px';
</script>

<div class="flex flex-row items-center group">
	<input
		class="flex-1 outline-none focus-visible:ring-2 rounded-sm ring-offset-2 transition ring-sky-700"
		type="range"
		{max}
		{min}
		bind:value
	/>
	<input
		class="ml-2 text-sm w-15 h-8 border px-2 rounded-sm transition duration-75 outline-none focus-within:ring-2 ring-offset-2 ring-sky-700"
		{min}
		{max}
		type="number"
		bind:value
	/>
	<span class="ml-2 text-sm text-neutral-600">{unit}</span>
</div>
