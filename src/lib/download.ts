import * as htmlToImage from 'html-to-image';

export async function downloadPng(node: HTMLElement, filename: string) {
	try {
		const dataUrl = await htmlToImage.toPng(node);
		downloadUrl(dataUrl, filename);
		return { success: true };
	} catch (error) {
		return { success: false };
	}
}

function downloadUrl(url: string, name: string) {
	const link = document.createElement('a');
	link.download = name;
	link.href = url;
	link.style.display = 'none';

	document.body.appendChild(link);
	window.URL.revokeObjectURL(url);
	link.click();
	link.remove();
}
