<script>
	import { clickOutside } from '$lib/clickOutside';
	import { trapFocus } from '$lib/trapFocus';
	import { fade, scale } from 'svelte/transition';

	export let open = false;
	$: if (open) {
		document.body.style.overflow = 'hidden';
	}

	function handleModalClose() {
		open = false;
		document.body.style.overflow = 'auto';
	}
</script>

<svelte:document
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			handleModalClose();
		}
	}}
/>
{#if open}
	<div
		transition:fade|global={{ duration: 200 }}
		class="fixed inset-0 z-10 transition duration-300 bg-black/20"
	></div>
	<div
		class="z-20 fixed overflow-auto inset-0 w-full h-full grid place-items-center"
		role="dialog"
		in:scale|global={{ duration: 200, opacity: 0.5, start: 0.8 }}
		out:scale|global={{ duration: 200, opacity: 0, start: 0.8 }}
		use:trapFocus
	>
		<div
			class="bg-white rounded-sm shadow w-full h-full lg:w-max lg:h-max overflow-auto p-4 relative"
			use:clickOutside={handleModalClose}
		>
			<button
				class="absolute p-1 top-2 right-2 transition text-neutral-500 enabled:hover:text-black focus-visible:text-black outline-none rounded-full border focus-visible:ring-1 ring-offset-2 focus-visible:ring-sky-600 hover:border-black"
				on:click={handleModalClose}
			>
				<svg
					class="w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
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
			</button>
			<slot />
		</div>
	</div>
{/if}
