<script lang="ts">
	import '@simonwep/pickr/dist/themes/nano.min.css'; // 'monolith' theme

	export let color = '#ffffff';
	function colorPicker(el: HTMLButtonElement, { initialColor }: { initialColor: string }) {
		const pickr = import('@simonwep/pickr').then(({ default: Pickr }) => {
			const pickr = Pickr.create({
				el: el,
				default: initialColor,
				theme: 'nano',
				useAsButton: true,
				position: 'bottom-middle',
				autoReposition: false,
				swatches: [
					'rgba(244, 67, 54, 1)',
					'rgba(156, 39, 176, 1)',
					'rgba(103, 58, 183, 1)',
					'rgba(33, 150, 243, 1)',
					'rgba(3, 169, 244, 1)',
					'rgba(205, 220, 57, 1)',
					'rgba(255, 193, 7, 1)'
				],
				components: {
					// Main components
					preview: true,
					opacity: true,
					hue: true,

					// Input / output Options
					interaction: {
						hex: true,
						rgba: true,
						hsla: true,
						input: true
					}
				}
			});
			pickr.on('change', (c: any) => {
				color = `#${c.toHEXA().join('')}`;
				pickr.applyColor();
			});
			return pickr;
		});
		return {
			async destroy() {
				await pickr.then((d) => d.destroyAndRemove());
			}
		};
	}
</script>

<button
	class="flex flex-row items-center group outline-none w-max"
	use:colorPicker={{
		initialColor: color
	}}
>
	<div
		class="w-7 h-7 rounded-full border border-neutral-300 outline-none transition duration-75 group-hover:ring-2 group-focus-visible:ring-2 group-focus-visible:ring-sky-700 active:ring-sky-700 ring-offset-1"
		style="background-color: {color};"
	></div>
	<span class="text-sm text-gray-500 ml-2 hover:ring-1 p-1 rounded-sm ring-sky-600">{color}</span>
</button>
