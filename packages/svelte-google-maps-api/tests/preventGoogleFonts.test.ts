import { describe, expect, it } from 'vitest';
import { preventGoogleFonts } from '../src/lib/utils/preventGoogleFonts';

describe('preventGoogleFonts', () => {
	it('blocks Google Maps font nodes while preserving unrelated head nodes', () => {
		const head = document.head;
		const originalAppendChild = head.appendChild;
		const originalInsertBefore = head.insertBefore;

		try {
			preventGoogleFonts();

			const googleFont = document.createElement('link');
			googleFont.href = 'https://fonts.googleapis.com/css?family=Roboto';
			head.appendChild(googleFont);

			const googleMapStyle = document.createElement('style');
			googleMapStyle.innerHTML = '.gm-style { font: 400 11px Roboto, Arial, sans-serif; }';
			head.appendChild(googleMapStyle);

			const unrelatedStyle = document.createElement('style');
			unrelatedStyle.innerHTML = '.app { color: red; }';
			head.appendChild(unrelatedStyle);

			expect(head.contains(googleFont)).toBe(false);
			expect(googleMapStyle.innerHTML).toBe('');
			expect(head.contains(unrelatedStyle)).toBe(true);
		} finally {
			head.appendChild = originalAppendChild;
			head.insertBefore = originalInsertBefore;
		}
	});
});
