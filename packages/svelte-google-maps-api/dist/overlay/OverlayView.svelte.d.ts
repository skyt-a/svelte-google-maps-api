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
declare const OverlayView: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined;
    mapPaneName?: keyof google.maps.MapPanes;
    onLoad?: ((overlayView: google.maps.OverlayView) => void) | undefined;
    onUnmount?: ((overlayView: google.maps.OverlayView) => void) | undefined;
}, {
    default: {};
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type OverlayView = InstanceType<typeof OverlayView>;
export default OverlayView;
//# sourceMappingURL=OverlayView.svelte.d.ts.map