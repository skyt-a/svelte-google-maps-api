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
declare const DirectionsRenderer: $$__sveltets_2_IsomorphicComponent<{
    directions?: google.maps.DirectionsResult | undefined;
    options?: google.maps.DirectionsRendererOptions | undefined;
    routeIndex?: number | undefined;
    panel?: HTMLElement | undefined;
    draggable?: boolean | undefined;
    hideRouteList?: boolean | undefined;
    preserveViewport?: boolean | undefined;
    suppressMarkers?: boolean | undefined;
    suppressInfoWindows?: boolean | undefined;
    suppressPolylines?: boolean | undefined;
    markerOptions?: google.maps.MarkerOptions | undefined;
    polylineOptions?: google.maps.PolylineOptions | undefined;
    onDirectionsChanged?: (() => void) | undefined;
    onLoad?: ((renderer: google.maps.DirectionsRenderer) => void) | undefined;
    onUnmount?: ((renderer: google.maps.DirectionsRenderer) => void) | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type DirectionsRenderer = InstanceType<typeof DirectionsRenderer>;
export default DirectionsRenderer;
//# sourceMappingURL=DirectionsRenderer.svelte.d.ts.map