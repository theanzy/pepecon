<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import Emoji from '$lib/components/Emoji.svelte';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import { text } from '@sveltejs/kit';
	let color = '#211871';
	let value = {
		native: '',
		src: undefined
	};
	let fontsize = 32;
	let textcolor = '#ffffff';
	let inputref: HTMLInputElement | undefined;
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
				<div
					class="flex items-center overflow-hidden w-20 h-8 border text-lg rounded-sm transition duration-75 outline-none focus-within:ring-2 ring-offset-1 ring-sky-700"
				>
					<button
						class="{value.src ? '' : ' hidden'} p-1 outline-none w-full"
						on:click={() => {
							value = {
								native: '',
								src: undefined
							};
							inputref?.focus();
						}}
					>
						<img style="height: 18px;" src={value.src} alt="" />
					</button>
					<input
						bind:this={inputref}
						type="text"
						class="{value.src ? 'hidden' : ' '}border-none outline-none w-full p-1"
						placeholder=""
						bind:value={value.native}
					/>
				</div>

				<div class="flex flex-row items-center">
					<ColorPicker bind:color={textcolor} />
					<span class="text-sm text-gray-600 ml-2">{textcolor}</span>
				</div>
			</div>
			<EmojiPicker bind:value />
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
			<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
				<Emoji bind:value bind:size={fontsize} bind:color={textcolor} />
			</div>
		</div>
	</div>
</div>
