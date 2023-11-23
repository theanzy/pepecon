<script>
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	let color = '#211871';
</script>

<div class="w-full mx-auto px-2 py-2 flex flex-row">
	<div class="min-w-[200px]">
		<h2 class="text-center font-bold text-xl mb-4">Controls</h2>
		<ColorPicker bind:color />
	</div>
	<div class="flex-1 px-2">
		<h2 class="text-center font-bold text-xl mb-4">Preview</h2>
		<div
			class="w-32 h-32 rounded-full border-black mx-auto"
			style="background-color: {color};"
		></div>
	</div>
</div>
