<script lang="ts">
	import { invalidate } from '$app/navigation';

	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import RangeInput from '$lib/components/RangeInput.svelte';
	import EmojiAdd from '$lib/components/icons/EmojiAdd.svelte';
	import EmojiAddFilled from '$lib/components/icons/EmojiAddFilled.svelte';
	import AddEmojiModal from '$lib/components/AddEmojiModal.svelte';
	import type { CustomEmoji } from '$lib/types';
	import Emoji from '$lib/components/Emoji.svelte';
	import GradientPicker from '$lib/components/GradientPicker.svelte';
	import { downloadPng } from '$lib/download.js';
	import toast from 'svelte-french-toast';

	export let data;

	let customEmojis: CustomEmoji[] = [];
	$: {
		data.streamed.emojis.then((results) => {
			customEmojis = results.map((d) => ({
				id: d.id,
				name: d.name,
				skins: [
					{
						src: d.src
					}
				]
			}));
		});
	}

	let containerColor = '';
	let containerBorderRadius = 0;
	let value = {
		native: 'X',
		src: undefined
	};
	let contentSize = 32;
	let contentColor = '#ffffff';
	let openModal = false;
	let contentEl: HTMLDivElement;

	async function handleDownload(filetype: 'png') {
		let ok = false;
		if (filetype === 'png') {
			const { success } = await downloadPng(contentEl, 'pepecon.png');
			ok = success;
		}
		if (!ok) {
			toast.error('Fail to download');
		} else {
			toast.success('Downloaded');
		}
	}
</script>

<svelte:head>
	<title>pepecon</title>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

<div class="flex-1 w-full mx-auto px-2 flex flex-col lg:flex-row gap-6">
	<div
		class="min-w-[250px] max-w-full py-2 px-3 lg:pr-5 pb-10 lg:pb-3 flex flex-col gap-2 border-0 border-b lg:border-b-0 lg:border-r"
	>
		<h2 class="text-center font-bold text-xl mb-">Controls</h2>
		<div class="flex flex-col gap-5">
			<div>
				<p class="font-medium mb-2">Shape Color</p>
				<GradientPicker bind:gradientColor={containerColor} />
			</div>
			<div>
				<p class="font-medium mb-2">Rounded</p>
				<RangeInput bind:value={containerBorderRadius} max={128} min={0} unit="px" />
			</div>
			<div>
				<div class="flex flex-row mb-2 items-center">
					<p class="font-medium">Value</p>
					<button
						on:click={() => {
							openModal = true;
						}}
						aria-label="Add custom emoji"
						class="group rounded-full flex flex-row items-center ml-2 transition outline-none focus-visible:ring-1 ring-offset-2 focus-visible:ring-sky-600 text-amber-600"
					>
						<div class="relative w-6 h-6">
							<EmojiAdd class="mt-[2px] w-5 h-5 absolute transition group-hover:opacity-0" />
							<EmojiAddFilled
								class="mt-[2px] w-5 h-5 absolute opacity-0 group-hover:opacity-100 transition"
							/>
						</div>
						<div
							role="tooltip"
							class="absolute text-white bg-black text-xs px-2 py-1 rounded -translate-y-6 -translate-x-[42%] z-1 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"
						>
							Add Custom Emoji
						</div>
						<span class="sr-only">Add Custom Emoji</span>
					</button>
					{#if openModal}
						<AddEmojiModal
							bind:open={openModal}
							on:success={async () => {
								console.log('emoji added');
								await invalidate('/');
							}}
						/>
					{/if}
				</div>
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
					<EmojiPicker bind:value {customEmojis} />
					<ColorPicker bind:color={contentColor} />
				</div>
			</div>
			<div>
				<p class="font-medium mb-2">Size</p>
				<RangeInput bind:value={contentSize} max={200} min={20} unit="px" />
			</div>
		</div>
	</div>
	<div class="flex-1 mb-7 py-2">
		<h2 class="text-center font-bold text-xl mb-4">Preview</h2>
		<div class="flex justify-center p-5 rounded items-center border w-max mx-auto">
			<div
				bind:this={contentEl}
				style="position: relative; background: {containerColor}; width: 256px; height: 256px; border-radius: {containerBorderRadius}px; overflow: hidden;"
			>
				<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
					<Emoji bind:value bind:size={contentSize} bind:color={contentColor} />
				</div>
			</div>
		</div>

		<div class="mt-8">
			<p class="text-sm mr-3">Download:</p>
			<hr class="my-2" />
			<div class="flex flex-row gap-2 justify-start items-center">
				<button
					class="text-neutral-500 text-sm font-bold flex flex-row items-center gap-2 border rounded transition outline-none focus-visible:ring-2 ring-offset-2 focus-visible:ring-sky-600 px-3 py-1 enabled:hover:text-sky-600"
					on:click={() => {
						handleDownload('png');
					}}
				>
					<svg
						class="w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<path fill="currentColor" d="M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" /><path
							fill="currentColor"
							fill-rule="evenodd"
							d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.088c0 1.909 0 3.471-.104 4.743c-.104 1.28-.317 2.347-.795 3.235c-.21.391-.47.742-.785 1.057c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.793-.793-1.203-1.78-1.42-3.006c-.215-1.203-.254-2.7-.262-4.558c-.002-.473-.002-.973-.002-1.501v-.058c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19Zm-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386v.844l1.001-.877a2.3 2.3 0 0 1 3.141.105l4.29 4.29a2 2 0 0 0 2.564.222l.298-.21a3 3 0 0 1 3.732.225l2.83 2.547c.286-.598.455-1.384.545-2.493c.098-1.205.099-2.707.099-4.653c0-2.378-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176Z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>PNG</span>
				</button>
			</div>
		</div>
	</div>
</div>
