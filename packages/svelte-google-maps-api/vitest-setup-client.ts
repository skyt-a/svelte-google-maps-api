import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

afterEach(() => {
	document.head.innerHTML = '';
	document.body.innerHTML = '';
	delete (window as typeof window & { google?: unknown }).google;
	delete (window as typeof window & { __svelteGoogleMapApiCallback__?: unknown })
		.__svelteGoogleMapApiCallback__;
});
