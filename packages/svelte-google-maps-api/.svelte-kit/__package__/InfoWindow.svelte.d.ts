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
declare const InfoWindow: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    anchor?: (google.maps.LatLng | google.maps.LatLngLiteral | google.maps.marker.AdvancedMarkerElement | google.maps.MVCObject) | undefined;
    position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
    options?: google.maps.InfoWindowOptions | undefined;
    headerContent?: Element | string | undefined;
    zIndex?: number | undefined;
    shouldFocus?: boolean;
    isOpen?: boolean;
    onCloseClick?: (() => void) | undefined;
    onDomReady?: (() => void) | undefined;
    onContentChanged?: (() => void) | undefined;
    onPositionChanged?: (() => void) | undefined;
    onZIndexChanged?: (() => void) | undefined;
    onLoad?: ((infoWindow: google.maps.InfoWindow) => void) | undefined;
    onUnmount?: ((infoWindow: google.maps.InfoWindow) => void) | undefined;
}, {
    default: {};
    header: {};
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
    header: {};
}, {}, string>;
type InfoWindow = InstanceType<typeof InfoWindow>;
export default InfoWindow;
//# sourceMappingURL=InfoWindow.svelte.d.ts.map