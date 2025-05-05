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
declare const HeatmapLayer: $$__sveltets_2_IsomorphicComponent<{
    data?: (google.maps.MVCArray<google.maps.LatLng | google.maps.LatLngLiteral | google.maps.visualization.WeightedLocation> | google.maps.visualization.WeightedLocation[] | {
        location: google.maps.LatLngLiteral;
        weight: number;
    }[] | (google.maps.LatLng | google.maps.LatLngLiteral)[]) | undefined;
    options?: google.maps.visualization.HeatmapLayerOptions | undefined;
    dissipating?: boolean | undefined;
    gradient?: string[] | undefined;
    maxIntensity?: number | undefined;
    opacity?: number | undefined;
    radius?: number | undefined;
    onLoad?: ((heatmapLayer: google.maps.visualization.HeatmapLayer) => void) | undefined;
    onUnmount?: ((heatmapLayer: google.maps.visualization.HeatmapLayer) => void) | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type HeatmapLayer = InstanceType<typeof HeatmapLayer>;
export default HeatmapLayer;
//# sourceMappingURL=HeatmapLayer.svelte.d.ts.map