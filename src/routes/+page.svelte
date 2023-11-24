<script>
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	let color = '#211871';
	let value = '';
	let fontsize = 32;
	let textcolor = '#ffffff';
</script>

<div class="w-full mx-auto px-2 py-2 flex flex-row">
	<div class="min-w-[200px] flex flex-col gap-3">
		<h2 class="text-center font-bold text-xl mb-4">Controls</h2>
		<div>
			<p class="font-medium mb-2">Shape</p>
			<div class="flex flex-row items-center">
				<ColorPicker bind:color />
				<span class="text-sm text-gray-600 ml-2">{color}</span>
			</div>
		</div>
		<hr class="my-2" />
		<div>
			<p class="font-medium mb-2">Value</p>
			<div class="flex flex-row gap-2">
				<input
					type="text"
					class="border text-lg rounded-sm p-1 w-20 transition duration-75 outline-none focus:ring-2 ring-offset-1 ring-sky-700"
					placeholder=""
					bind:value
				/>
				<div class="flex flex-row items-center">
					<ColorPicker bind:color={textcolor} />
					<span class="text-sm text-gray-600 ml-2">{textcolor}</span>
				</div>
			</div>

			<EmojiPicker bind:val={value} />
		</div>
		<div>
			<p class="font-medium mb-2">Font Size</p>
			<input class="w-full" type="range" max={200} min={20} bind:value={fontsize} />
		</div>
	</div>
	<div class="flex-1 px-2">
		<h2 class="text-center font-bold text-xl mb-4">Preview</h2>
		<div
			class="rounded-full border-black mx-auto grid place-items-center overflow-hidden select-none relative p-1"
			style="background-color: {color}; width: 256px; height: 256px;"
		>
			<span
				style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: {fontsize}px; color: {textcolor}"
				>{value}</span
			>
		</div>
	</div>
</div>
