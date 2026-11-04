import { untrack } from 'svelte';
import type { LatLngInput } from '../types.js';

type Handler = ((...args: never[]) => unknown) | undefined | null | false;

interface ListenerTarget {
	addListener(
		eventName: string,
		handler: (...args: unknown[]) => void
	): google.maps.MapsEventListener;
}

/**
 * Registers Maps event listeners for every defined handler and returns a cleanup function.
 *
 * Maps events can fire synchronously inside an effect (e.g. `setCenter()` fires
 * `center_changed`), so handlers run untracked to keep their reads out of that effect.
 */
export function addListeners(target: ListenerTarget, handlers: Record<string, Handler>) {
	const listeners: google.maps.MapsEventListener[] = [];

	for (const [eventName, handler] of Object.entries(handlers)) {
		if (typeof handler !== 'function') continue;
		listeners.push(
			target.addListener(eventName, (...args: unknown[]) =>
				untrack(() => (handler as (...args: unknown[]) => unknown)(...args))
			)
		);
	}

	return () => {
		for (const listener of listeners) listener.remove();
	};
}

/** Removes keys whose value is `undefined` so they do not override defaults. */
export function definedOnly<T extends Record<string, unknown>>(values: T): Partial<T> {
	return Object.fromEntries(
		Object.entries(values).filter(([, value]) => value !== undefined)
	) as Partial<T>;
}

export function toLatLngLiteral(
	value: LatLngInput | null | undefined
): google.maps.LatLngLiteral | null {
	if (!value) return null;

	const lat = (value as { lat: number | (() => number) }).lat;
	const lng = (value as { lng: number | (() => number) }).lng;

	return {
		lat: typeof lat === 'function' ? lat.call(value) : lat,
		lng: typeof lng === 'function' ? lng.call(value) : lng
	};
}

export function latLngEquals(
	a: LatLngInput | null | undefined,
	b: LatLngInput | null | undefined
): boolean {
	const left = toLatLngLiteral(a);
	const right = toLatLngLiteral(b);

	if (!left || !right) return left === right;
	return left.lat === right.lat && left.lng === right.lng;
}

export function pathEquals(a: LatLngInput[], b: LatLngInput[]): boolean {
	return a.length === b.length && a.every((point, index) => latLngEquals(point, b[index]));
}

export function toBoundsLiteral(
	bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null | undefined
): google.maps.LatLngBoundsLiteral | null {
	if (!bounds) return null;
	if (typeof (bounds as google.maps.LatLngBounds).toJSON === 'function') {
		return (bounds as google.maps.LatLngBounds).toJSON();
	}
	return bounds as google.maps.LatLngBoundsLiteral;
}

export function boundsEquals(
	a: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null | undefined,
	b: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null | undefined
): boolean {
	const left = toBoundsLiteral(a);
	const right = toBoundsLiteral(b);

	if (!left || !right) return left === right;
	return (
		left.north === right.north &&
		left.south === right.south &&
		left.east === right.east &&
		left.west === right.west
	);
}

export function mvcArrayToPath(
	array: google.maps.MVCArray<google.maps.LatLng>
): google.maps.LatLngLiteral[] {
	return array.getArray().map((point) => toLatLngLiteral(point) as google.maps.LatLngLiteral);
}

/** True when the element holds something worth showing (an element or non-blank text). */
export function hasRenderableContent(element: HTMLElement): boolean {
	return Array.from(element.childNodes).some(
		(node) =>
			node.nodeType === Node.ELEMENT_NODE ||
			(node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()))
	);
}

/** Watches insert/remove/set events on an MVCArray and returns a cleanup function. */
export function watchMvcArray(array: google.maps.MVCArray<unknown>, onChange: () => void) {
	return addListeners(array as unknown as ListenerTarget, {
		insert_at: onChange,
		remove_at: onChange,
		set_at: onChange
	});
}
