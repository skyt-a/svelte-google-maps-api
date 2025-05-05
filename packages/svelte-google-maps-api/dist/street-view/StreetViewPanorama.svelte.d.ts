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
declare const StreetViewPanorama: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    options?: google.maps.StreetViewPanoramaOptions | undefined;
    containerId?: string | undefined | undefined;
    containerClass?: string | undefined;
    containerStyle?: string | undefined;
    position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
    pov?: google.maps.StreetViewPov | undefined;
    zoom?: number | undefined | undefined;
    pano?: string | undefined | undefined;
    addressControl?: boolean | undefined | undefined;
    enableCloseButton?: boolean | undefined | undefined;
    fullscreenControl?: boolean | undefined | undefined;
    imageDateControl?: boolean | undefined | undefined;
    linksControl?: boolean | undefined | undefined;
    motionTracking?: boolean | undefined | undefined;
    motionTrackingControl?: boolean | undefined | undefined;
    panControl?: boolean | undefined | undefined;
    scrollwheel?: boolean | undefined | undefined;
    zoomControl?: boolean | undefined | undefined;
    visible?: boolean | undefined;
    onCloseClick?: (() => void) | undefined | undefined;
    onPanoChanged?: (() => void) | undefined | undefined;
    onPositionChanged?: (() => void) | undefined | undefined;
    onPovChanged?: (() => void) | undefined | undefined;
    onResize?: (() => void) | undefined | undefined;
    onStatusChanged?: (() => void) | undefined | undefined;
    onVisibleChanged?: (() => void) | undefined | undefined;
    onZoomChanged?: (() => void) | undefined | undefined;
    onLoad?: ((panorama: google.maps.StreetViewPanorama) => void) | undefined | undefined;
    onUnmount?: ((panorama: google.maps.StreetViewPanorama) => void) | undefined | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type StreetViewPanorama = InstanceType<typeof StreetViewPanorama>;
export default StreetViewPanorama;
//# sourceMappingURL=StreetViewPanorama.svelte.d.ts.map