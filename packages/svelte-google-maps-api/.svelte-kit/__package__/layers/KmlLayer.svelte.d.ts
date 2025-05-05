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
declare const KmlLayer: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    url?: string | undefined | undefined;
    options?: google.maps.KmlLayerOptions | undefined;
    clickable?: boolean | undefined | undefined;
    preserveViewport?: boolean | undefined | undefined;
    screenOverlays?: boolean | undefined | undefined;
    suppressInfoWindows?: boolean | undefined | undefined;
    zIndex?: number | undefined | undefined;
    onClick?: ((e: google.maps.KmlMouseEvent) => void) | undefined | undefined;
    onDefaultViewportChanged?: (() => void) | undefined | undefined;
    onStatusChanged?: (() => void) | undefined | undefined;
    onLoad?: ((layer: google.maps.KmlLayer) => void) | undefined | undefined;
    onUnmount?: ((layer: google.maps.KmlLayer) => void) | undefined | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type KmlLayer = InstanceType<typeof KmlLayer>;
export default KmlLayer;
//# sourceMappingURL=KmlLayer.svelte.d.ts.map