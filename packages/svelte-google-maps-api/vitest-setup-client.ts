import * as matchers from '@testing-library/jest-dom/matchers';
import { afterEach, expect } from 'vitest';
import { resetLoaderForTesting } from './src/lib/internal/loader.js';

expect.extend(matchers);

afterEach(() => {
	resetLoaderForTesting();
	document.head.innerHTML = '';
	document.body.innerHTML = '';
	delete (window as typeof window & { google?: unknown }).google;
});
