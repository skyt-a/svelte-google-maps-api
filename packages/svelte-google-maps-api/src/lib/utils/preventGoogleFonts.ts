function isGoogleFontStyle(element: Node): boolean {
	const href = (element as HTMLLinkElement).href;

	if (
		href &&
		(href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0 ||
			href.indexOf('https://fonts.googleapis.com/css?family=Google+Sans+Text') === 0)
	) {
		return true;
	}

	const tagName = (element as HTMLElement).tagName?.toLowerCase();
	if (tagName !== 'style') return false;

	const styleElement = element as HTMLStyleElement & {
		styleSheet?: { cssText?: string };
	};
	const styleSheetText = styleElement.styleSheet?.cssText;

	if (styleSheetText && styleSheetText.replace('\r\n', '').indexOf('.gm-style') === 0) {
		styleElement.styleSheet!.cssText = '';
		return true;
	}

	if (
		styleElement.innerHTML &&
		styleElement.innerHTML.replace('\r\n', '').indexOf('.gm-style') === 0
	) {
		styleElement.innerHTML = '';
		return true;
	}

	return !styleElement.styleSheet && !styleElement.innerHTML;
}

export function preventGoogleFonts(): void {
	const head = document.getElementsByTagName('head')[0];
	if (!head) return;

	const trueInsertBefore = head.insertBefore.bind(head);
	head.insertBefore = function insertBefore<T extends Node>(
		newElement: T,
		referenceElement: Node | null
	): T {
		if (!isGoogleFontStyle(newElement)) {
			Reflect.apply(trueInsertBefore, head, [newElement, referenceElement]);
		}

		return newElement;
	};

	const trueAppend = head.appendChild.bind(head);
	head.appendChild = function appendChild<T extends Node>(newElement: T): T {
		if (!isGoogleFontStyle(newElement)) {
			Reflect.apply(trueAppend, head, [newElement]);
		}

		return newElement;
	};
}
