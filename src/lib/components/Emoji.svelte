<script lang="ts">
	export let value: {
		native: string | undefined;
		src: string | undefined;
	} = {
		native: undefined,
		src: undefined
	};
	export let size = 0;
	export let color = '#ffffff';
</script>

{#if value.native}
	<span style="font-size: {size}px; color: {color}">
		{value.native}
	</span>
{:else if value.src}
	<img
		style="object-fit: contain; width: auto; height: auto; max-width: {size}px; max-height: {size}px;"
		src={value.src}
		alt=""
	/>
{/if}
