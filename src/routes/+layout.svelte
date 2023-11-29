<script>
	import '$lib/global.css';
	import { Toaster } from 'svelte-french-toast';
</script>

<div class="flex flex-col min-h-[100dvh] items-stretch">
	<nav>
		<div class="px-6 py-2 mx-auto max-w-5xl">
			<a
				href="/"
				class="font-extrabold text-lg outline-none focus:text-sky-600 transition duration-75"
				>pepecon</a
			>
		</div>
	</nav>
	<main class="flex-1 flex flex-col mx-auto max-w-5xl w-full h-full">
		<slot />
	</main>
</div>
<Toaster
	toastOptions={{
		position: 'top-right'
	}}
/>
