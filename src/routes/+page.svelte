<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import Emoji from '$lib/components/Emoji.svelte';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import RangeInput from '$lib/components/RangeInput.svelte';
	import DownloadPng from '$lib/components/DownloadPNG.svelte';
	let containerColor = '#211871';
	let containerBorderRadius = 0;
	let value = {
		native: 'X',
		src: undefined
	};
	let contentSize = 32;
	let contentColor = '#ffffff';
</script>

<div class="w-full mx-auto px-2 py-2 flex flex-row">
	<div class="min-w-[250px] flex flex-col gap-3 border-r pr-5">
		<h2 class="text-center font-bold text-xl mb-4">Controls</h2>
		<div class="flex flex-col gap-3">
			<div>
				<p class="font-medium mb-2">Shape Color</p>
				<ColorPicker bind:color={containerColor} />
			</div>
			<div>
				<p class="font-medium mb-2">Rounded</p>
				<RangeInput bind:value={containerBorderRadius} max={128} min={0} unit="px" />
			</div>
		</div>
		<hr class="my-2" />
		<div class="flex flex-col gap-3">
			<div>
				<p class="font-medium mb-2">Value</p>
				<div class="flex flex-row gap-2">
					<div
						class="flex flex-row items-center overflow-hidden w-20 h-8 border text-lg rounded-sm transition duration-75 outline-none focus-within:ring-2 ring-offset-1 focus-within:ring-sky-700"
					>
						<button
							class="{value.src ? '' : 'hidden'} p-1 outline-none flex-1 group"
							on:click={() => {
								value = {
									native: '',
									src: undefined
								};
							}}
						>
							<div class="relative">
								<img style="height: auto; width:auto; max-height: 20px;" src={value.src} alt="" />
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="hidden group-hover:block w-5 h-5 text-neutral-500 absolute right-5 top-0"
									viewBox="0 0 24 24"
									><path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M18 6L6 18M6 6l12 12"
									/></svg
								>
							</div>
						</button>
						<input
							type="text"
							class="{value.src ? 'hidden' : ' '} border-none outline-none w-full px-2"
							placeholder=""
							bind:value={value.native}
						/>
					</div>
					<EmojiPicker bind:value />
					<ColorPicker bind:color={contentColor} />
				</div>
			</div>
			<div>
				<p class="font-medium mb-2">Size</p>
				<RangeInput bind:value={contentSize} max={200} min={20} unit="px" />
			</div>
		</div>
	</div>
	<div class="flex-1 px-5">
		<h2 class="text-center font-bold text-xl mb-4">Preview</h2>
		<div
			class="border-black mx-auto flex justify-center items-center overflow-hidden select-none relative p-1"
			style="background-color: {containerColor}; width: 256px; height: 256px; border-radius: {containerBorderRadius}px;"
		>
			<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
				<Emoji bind:value bind:size={contentSize} bind:color={contentColor} />
			</div>
		</div>

		<div class="mt-8">
			<p class="text-sm mr-3">Download:</p>
			<hr class="my-2" />
			<div class="flex justify-start items-center">
				<DownloadPng
					values={{
						containerBorderRadius,
						containerColor,
						containerSize: 256,
						value,
						valueSize: contentSize,
						valueColor: contentColor
					}}
				/>
			</div>
		</div>
	</div>
</div>
