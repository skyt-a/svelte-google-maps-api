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
declare const GroundOverlay: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    url: string;
    bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    options?: google.maps.GroundOverlayOptions | undefined;
    clickable?: boolean | undefined | undefined;
    opacity?: number | undefined | undefined;
    onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onLoad?: ((overlay: google.maps.GroundOverlay) => void) | undefined | undefined;
    onUnmount?: ((overlay: google.maps.GroundOverlay) => void) | undefined | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type GroundOverlay = InstanceType<typeof GroundOverlay>;
export default GroundOverlay;
//# sourceMappingURL=GroundOverlay.svelte.d.ts.map