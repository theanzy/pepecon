<script lang="ts">
	import data from '@emoji-mart/data';
	import { Picker } from 'emoji-mart';
	export let val: string;

	function emojiPicker(el: HTMLElement) {
		const picker = new Picker({
			parent: el,
			data: data,
			categories: [
				'activity',
				// 'flags',
				// 'foods',
				// 'frequent',
				'nature',
				// 'objects',
				'people'
				// 'places',
				// 'symbols',
			],
			custom: [
				{
					id: 'github',
					name: 'GitHub',
					emojis: [
						{
							id: 'octocat',
							name: 'Octocat',
							keywords: ['github'],
							skins: [{ src: 'https://www.svgrepo.com/show/370688/social-github-octocat.svg' }]
						}
					]
				}
			],
			set: 'native',
			onEmojiSelect: (v: any) => {
				val = v.native;
				console.log(v);
			}
		});
	}
</script>

<div use:emojiPicker></div>
