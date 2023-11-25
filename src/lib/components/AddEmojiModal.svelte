<script lang="ts">
	import { init, SearchIndex } from 'emoji-mart';
	import data from '@emoji-mart/data';

	import Modal from './Modal.svelte';
	import { onMount } from 'svelte';
	import {
		PUBLIC_CLOUDINARY_UPLOAD_PRESET,
		PUBLIC_CLOUDINARY_UPLOAD_URL
	} from '$env/static/public';
	import toast from 'svelte-french-toast';

	export let open = false;

	let name: string = '';
	let id: string = '';
	let errorMsg = '';
	let files: FileList;
	let filesEl: HTMLInputElement;
	let loading = false;

	$: {
		id = name.toLowerCase().replace(/\W+/g, '_').replace(/^_|_$/, '');
	}
	onMount(() => {
		init({ data });
	});
	async function searchNativeEmojis(value: string) {
		const emojis = await SearchIndex.search(value);
		const results =
			emojis?.map((emoji: any) => {
				return emoji.id;
			}) ?? [];
		return results as string[];
	}

	async function handleSubmit(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		e.preventDefault();

		if (!name) {
			errorMsg = 'Name is required';
			return;
		}
		const file = files?.[0];
		if (!file) {
			errorMsg = 'Image is required';
			return;
		}

		const formData = new FormData();
		const results = await searchNativeEmojis(name.toLocaleLowerCase());
		if (results?.includes(id)) {
			errorMsg = 'This id already taken';
			return;
		}
		formData.append('file', file);
		formData.append('folder', 'pepecon');
		formData.append('upload_preset', PUBLIC_CLOUDINARY_UPLOAD_PRESET);

		const uploadURL = `${PUBLIC_CLOUDINARY_UPLOAD_URL}/image/upload`;
		try {
			loading = true;
			errorMsg = '';
			const res = await fetch(uploadURL, {
				method: 'POST',
				body: formData
			});
			const body = await res.json();
			console.log('body', body);
			if (!body.url) {
				throw new Error('error upload. url not available.');
			}
			const src = body.url;
			const emoji = {
				name,
				id,
				src: src
			};

			const apiurl = '/api/emoji';
			const insertRes = await fetch(apiurl, {
				method: 'POST',
				body: JSON.stringify(emoji),
				headers: {
					'content-type': 'application/json'
				}
			});
			const insertBody = await insertRes.json();
			if (insertRes.status !== 200) {
				throw new Error(insertBody.error);
			}
			errorMsg = '';
			name = '';
			filesEl.value = '';
			toast.success('Emoji Added');
		} catch (e) {
			console.log('error uploading image', e);
			if (e instanceof Error) {
				toast.error(e.message);
			} else {
				toast.error('Fail to upload image.');
			}
		} finally {
			loading = false;
		}
	}
</script>

<Modal bind:open>
	<div class="lg:w-96">
		<section class="max-w-[80dvw] mx-auto lg:px-4 lg:pb-4">
			<h2 class="text-2xl font-bold mb-1 mt-6">Upload Emoji</h2>
			<p class="text-neutral-600">Add your own image as emoji</p>
			<form on:submit={handleSubmit} class="flex flex-col gap-2 mt-6">
				<label for="name" class="text-neutral-600 font-medium">Name</label>
				<input
					class="px-2 py-1 rounded-sm border outline-none transition focus:ring-1 ring-offset-0 focus:ring-sky-600"
					id="name"
					type="text"
					placeholder="Name"
					bind:value={name}
				/>
				<p class="text-neutral-600 font-medium">Image</p>
				<label for="image" class="text-neutral-600 max-w-max">
					<input
						bind:this={filesEl}
						class="w-0 h-0 max-h-0 max-w-0 peer absolute"
						id="image"
						type="file"
						accept=".svg,.png,.jpeg,.jpg"
						bind:files
					/>
					<div
						class="flex flex-row gap-1 items-center py-1 px-2 text-sm rounded border w-max outline-none transition peer-focus-visible:ring-1 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-sky-600 hover:text-sky-600 cursor-pointer"
					>
						<svg
							class="w-6 h-6"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16h-2Zm-5 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
							/>
						</svg>
						Upload Image
					</div>
				</label>

				<div
					class="flex flex-col px-4 py-3 gap-2 rounded-sm border min-w-[300px] w-max mt-6 items-center bg-neutral-50"
				>
					<div class="flex flex-row gap-2 items-center">
						<p class="text-neutral-500">id:</p>
						<kbd class="text-sm bg-neutral-200 rounded px-2 py-1 h-7 text-center min-w-[50px]">
							{id ? `:${id}:` : ''}
						</kbd>
					</div>
					<div class="w-[128px] h-[128px] rounded-sm border bg-white">
						{#if files?.[0]}
							<img
								class="max-w-[128px] max-h-[128px] h-auto w-auto"
								alt=""
								src={URL.createObjectURL(files[0])}
							/>
						{/if}
					</div>
				</div>
				{#if errorMsg}
					<p class="text-rose-600 text-sm my-1">{errorMsg}</p>
				{/if}
				<button
					disabled={loading}
					type="submit"
					class="cursor-pointer mt-3 border-none w-max rounded-sm px-8 py-1 bg-sky-500 text-neutral-50 transition disabled:opacity-50 enabled:hover:text-white enabled:hover:bg-sky-600 outline-none focus-visible:ring-1 ring-offset-2 focus-visible:ring-sky-600"
					>Add</button
				>
			</form>
		</section>
	</div>
</Modal>
