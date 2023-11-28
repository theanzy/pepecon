<script lang="ts">
	import { onMount } from 'svelte';
	import ColorPicker from './ColorPicker.svelte';
	import RangeInput from './RangeInput.svelte';
	type Color = {
		id: string;
		color: string;
		position: number;
	};
	let colors: Color[] = [
		{
			id: Math.random().toString(16).slice(2),
			color: '#ff0000',
			position: 0
		},
		{
			id: Math.random().toString(16).slice(2),
			color: '#0000ff',
			position: 100
		}
	];

	let barEl: HTMLDivElement;

	let selectedColorId: string | null = null;
	let draggedColorId: string | null = null;

	let angle = 0;
	const minColors = 2;
	const maxColors = 6;
	export let gradientColor = getGradient(colors, angle);

	$: {
		gradientColor = getGradient(colors, angle);
	}

	function getGradient(colors: Color[], angle: number = 0) {
		return `linear-gradient(${angle}deg, ${colors
			.sort((a, b) => a.position - b.position)
			.map((color) => `${color.color} ${color.position}%`)
			.join(', ')})`;
	}

	function handleAddColor(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		const target = e.target as HTMLDivElement;
		if (target !== e.currentTarget) {
			return;
		}
		if (colors.length >= maxColors) {
			return;
		}
		const targetRect = target.getBoundingClientRect();
		const x = e.x - targetRect.left;
		const val = Math.ceil((x / targetRect.width) * 100);
		const newColor = {
			id: Math.random().toString(16).slice(2),
			color: '#00ff00',
			position: val
		};
		colors = colors.concat([newColor]);
		selectedColorId = newColor.id;
	}

	function handleDeleteColor(id: string) {
		selectedColorId = null;
		draggedColorId = null;
		if (colors.length > minColors) {
			colors = colors.filter((c) => c.id !== id);
		}
	}
</script>

<svelte:window
	on:mousemove={(e) => {
		if (!draggedColorId) {
			return;
		}
		e.preventDefault();
		const targetRect = barEl.getBoundingClientRect();
		const x = e.x - targetRect.left;
		const val = Math.ceil((x / targetRect.width) * 100);
		const newVal = Math.min(100, Math.max(0, val));
		colors = colors.map((c) => {
			if (c.id === draggedColorId) {
				return {
					...c,
					position: newVal
				};
			}
			return c;
		});
	}}
	on:mouseup={(e) => {
		if (!draggedColorId) {
			return;
		}
		draggedColorId = null;
		const targetRect = barEl.getBoundingClientRect();
		const x = e.x - targetRect.left;
		const val = Math.ceil((x / targetRect.width) * 100);
		const newVal = Math.min(100, Math.max(0, val));
		colors = colors.map((c) => {
			if (c.id === draggedColorId) {
				return {
					...c,
					position: newVal
				};
			}
			return c;
		});
	}}
	on:keydown={(e) => {
		const draggedId = draggedColorId || selectedColorId;
		if (!draggedId) {
			return;
		}
		if (e.key === 'ArrowRight') {
			colors = colors.map((c) => {
				if (c.id === draggedId) {
					return {
						...c,
						position: Math.min(100, Math.max(0, c.position + 5))
					};
				}
				return c;
			});
		} else if (e.key === 'ArrowLeft') {
			colors = colors.map((c) => {
				if (c.id === draggedId) {
					return {
						...c,
						position: Math.min(100, Math.max(0, c.position - 5))
					};
				}
				return c;
			});
		} else if (e.key === 'Delete') {
			handleDeleteColor(draggedId);
		}
	}}
/>
<div>
	<div
		bind:this={barEl}
		class="w-full h-4 mt-5 rounded-full border relative cursor-copy outline-none"
		style="background: {getGradient(colors, 90)}"
		role="button"
		tabindex="-1"
		on:mousedown={handleAddColor}
	>
		{#each colors as color (color.id)}
			<div
				role="slider"
				tabindex="0"
				aria-valuenow={color.position}
				class="cursor-default absolute w-3 h-8 outline-none border border-white ring-offset-1 ring-offset-white rounded-full bg-white top-[50%] translate-y-[-50%] translate-x-[-50%] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600 hover:cursor-pointer {selectedColorId ===
				color.id
					? 'ring-sky-600 ring-2'
					: 'ring-neutral-400 ring-1 hover:ring-sky-600'}"
				style="left: {color.position}%; background-color: {color.color}"
				on:mousedown={() => {
					selectedColorId = color.id;
					draggedColorId = color.id;
				}}
			></div>
		{/each}
	</div>
	<div class="mt-4 mb-2 grid gap-2 grid-cols-2 lg:grid-cols-3">
		{#each colors as color (color.id)}
			<div
				role="button"
				tabindex="0"
				class="p-1 w-max min-w-[200px] flex flex-row justify-between items-center outline-none focus-within:ring-1 ring-neutral-300 rounded {selectedColorId ===
				color.id
					? 'ring-1px ring-neutral-300 bg-neutral-100'
					: 'hover:ring-1 hover:ring-neutral-300'}"
				on:mousedown={() => {
					selectedColorId = color.id;
				}}
				on:keypress={(e) => {
					if (e.key === 'Enter') {
						selectedColorId = color.id;
					}
				}}
			>
				<ColorPicker bind:color={color.color} />
				<button
					class="text-neutral-300 transition enabled:hover:text-black rounded-full outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-sky-500"
					on:click={() => handleDeleteColor(color.id)}
				>
					<svg
						class="w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						><path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
						/></svg
					>
				</button>
			</div>
		{/each}
	</div>
	<RangeInput bind:value={angle} min={0} max={360} unit="deg" />
</div>
