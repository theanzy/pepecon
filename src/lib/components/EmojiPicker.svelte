<script lang="ts">
	import data from '@emoji-mart/data';
	import { Picker } from 'emoji-mart';
	import { createPopper } from '@popperjs/core';
	import { clickOutside } from '$lib/clickOutside';
	import type { CustomEmoji } from '$lib/types';

	export let value: {
		native: string | undefined;
		src: string | undefined;
	};
	export let customEmojis: {
		id: string;
		name: string;
		skins: { src: string }[];
	}[] = [];

	let emojiEl: HTMLDivElement;
	let buttonEl: HTMLButtonElement;
	let popupOpen = false;

	$: if (popupOpen) {
		createPopper(buttonEl, emojiEl, {
			placement: 'bottom',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [-120, 8]
					}
				}
			]
		});
		emojiPicker(emojiEl);
	}

	function emojiPicker(el: HTMLElement) {
		new Picker({
			parent: el,
			emojiVersion: '14.0',
			theme: 'light',
			data: data,
			custom: [
				{
					emojis: customEmojis
				}
			],
			set: 'native',
			onEmojiSelect: (v: any) => {
				const newVal = {
					native: v.native,
					src: undefined
				};
				if (!newVal.native) {
					newVal.src = v.src;
				}
				value = newVal;
				console.log(v);
			}
		});
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			popupOpen = false;
		}
	}}
/>
<button
	bind:this={buttonEl}
	class="border group relative w-8 h-8 rounded-full grid place-items-center outline-none transition duration-75 ring-offset-2 ring-sky-600 {popupOpen
		? 'ring-1'
		: ''}"
	on:click={(e) => {
		popupOpen = !popupOpen;
	}}
>
	<span class="absolute {popupOpen ? 'opacity-0' : 'group-hover:opacity-0'}"> 😄 </span>
	<span
		class="absolute transition-transform duration-75
			{popupOpen
			? 'scale-125'
			: 'opacity-0 group-hover:opacity-100 group-hover:scale-125 group-focus-visible:opacity-100 group-focus-visible:scale-150'}
		"
	>
		🥳
	</span>
</button>
{#if popupOpen}
	<div
		bind:this={emojiEl}
		class="z-10"
		use:clickOutside={() => {
			popupOpen = false;
		}}
	></div>
{/if}
