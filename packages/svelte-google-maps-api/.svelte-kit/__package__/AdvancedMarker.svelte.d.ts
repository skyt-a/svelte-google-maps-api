interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const AdvancedMarker: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
    title?: string | undefined;
    zIndex?: number | undefined;
    element?: HTMLElement | undefined;
    gmpDraggable?: boolean | undefined;
    onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onLoad?: ((marker: google.maps.marker.AdvancedMarkerElement) => void) | undefined;
    onUnmount?: ((marker: google.maps.marker.AdvancedMarkerElement) => void) | undefined;
    getMarkerInstance?: () => google.maps.marker.AdvancedMarkerElement | null;
}, {
    default: {};
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {
    getMarkerInstance: () => google.maps.marker.AdvancedMarkerElement | null;
}, string>;
type AdvancedMarker = InstanceType<typeof AdvancedMarker>;
export default AdvancedMarker;
//# sourceMappingURL=AdvancedMarker.svelte.d.ts.map