<script lang="ts">
	import data from '@emoji-mart/data';
	import { Picker } from 'emoji-mart';
	export let value: {
		native: string | undefined;
		src: string | undefined;
	};
	let customEmojis = [
		{
			id: 'octocat',
			name: 'Octocat',
			keywords: ['github'],
			skins: [{ src: 'https://iconape.com/wp-content/png_logo_vector/github-octocat-logo.png' }],
			version: 1
		}
	];

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
			},
			onAddCustomEmoji: () => {}
		});
	}
</script>

<div use:emojiPicker></div>
