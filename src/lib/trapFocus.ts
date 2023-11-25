export function trapFocus(element: HTMLElement) {
	const focusableEls = element.querySelectorAll(
		'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
	);
	const firstFocusableEl = focusableEls[0];
	const lastFocusableEl = focusableEls[focusableEls.length - 1];
	const KEYCODE_TAB = 9;

	element.addEventListener('keydown', function (e) {
		const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

		if (!isTabPressed) {
			return;
		}

		if (e.shiftKey) {
			/* shift + tab */ if (document.activeElement === firstFocusableEl) {
				// @ts-expect-error type
				lastFocusableEl.focus();
				e.preventDefault();
			}
		} /* tab */ else {
			if (document.activeElement === lastFocusableEl) {
				// @ts-expect-error type
				firstFocusableEl.focus();
				e.preventDefault();
			}
		}
	});
}
