<script lang="ts">
	export let values: Params;
	type Params = {
		containerSize: number;
		containerBorderRadius: number;
		containerColor: string;
		value: {
			native: string | undefined;
			src: string | undefined;
		};
		valueSize: number;
		valueColor: string;
	};
	function drawElement(canvas: HTMLCanvasElement, { containerSize }: Params) {
		canvas.width = containerSize;
		canvas.height = containerSize;
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}

		function draw(
			ctx: CanvasRenderingContext2D,
			{ containerSize, containerBorderRadius, containerColor, value, valueSize, valueColor }: Params
		) {
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = 'high';
			ctx.fillStyle = containerColor;
			ctx.clearRect(0, 0, containerSize, containerSize);
			ctx.beginPath();
			ctx.roundRect(0, 0, containerSize, containerSize, [
				containerBorderRadius,
				containerBorderRadius
			]);
			ctx.fill();
			// content
			if (value.src) {
				const image = document.querySelector('#image') as HTMLImageElement;
				image.style.display = 'block';
				ctx.drawImage(
					image,
					containerSize / 2 - image.width / 2,
					containerSize / 2 - image.height / 2,
					image.width,
					image.height
				);
				image.style.display = 'none';
			} else {
				ctx.font = `${valueSize}px Lato`;
				ctx.textAlign = 'center';
				ctx.fillStyle = valueColor;
				const approxFontHeight = parseInt(ctx.font);

				const x = canvas.width / 2;
				const y = canvas.height / 2;
				ctx.fillText(value.native ?? '', x, y + approxFontHeight / 2.7);
			}
		}
		draw(ctx, values);

		return {
			update(values: Params) {
				draw(ctx, values);
			}
		};
	}
	function handleClick() {
		const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
		if (!canvas) {
			return;
		}
		drawElement(canvas, values);
		const link = document.createElement('a');
		link.download = 'pepecon.png';
		link.href = canvas.toDataURL();
		link.target = '_blank';

		link.click();
	}
</script>

<img
	id="image"
	style="display: none; max-width: {values.valueSize}px; max-height: {values.valueSize}px; height: auto; width: auto;"
	crossOrigin="anonymous"
	src={values.value.src || ''}
	alt="img"
/>

<canvas
	id="canvas"
	style="display: none; width: {values.containerSize}px; height:{values.containerSize}px;"
/>
<button
	on:click={handleClick}
	class="text-neutral-500 text-sm font-bold flex flex-row gap-2 border rounded transition outline-none focus-visible:ring-2 ring-offset-2 focus-visible:ring-sky-600 px-3 py-1 enabled:hover:text-sky-600"
>
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
		<path fill="currentColor" d="M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" /><path
			fill="currentColor"
			fill-rule="evenodd"
			d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.088c0 1.909 0 3.471-.104 4.743c-.104 1.28-.317 2.347-.795 3.235c-.21.391-.47.742-.785 1.057c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.793-.793-1.203-1.78-1.42-3.006c-.215-1.203-.254-2.7-.262-4.558c-.002-.473-.002-.973-.002-1.501v-.058c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19Zm-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386v.844l1.001-.877a2.3 2.3 0 0 1 3.141.105l4.29 4.29a2 2 0 0 0 2.564.222l.298-.21a3 3 0 0 1 3.732.225l2.83 2.547c.286-.598.455-1.384.545-2.493c.098-1.205.099-2.707.099-4.653c0-2.378-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176Z"
			clip-rule="evenodd"
		/>
	</svg>
	PNG
</button>
