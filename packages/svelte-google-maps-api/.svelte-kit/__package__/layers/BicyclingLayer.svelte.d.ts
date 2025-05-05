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
declare const BicyclingLayer: $$__sveltets_2_IsomorphicComponent<{
    onLoad?: ((layer: google.maps.BicyclingLayer) => void) | undefined;
    onUnmount?: ((layer: google.maps.BicyclingLayer) => void) | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type BicyclingLayer = InstanceType<typeof BicyclingLayer>;
export default BicyclingLayer;
//# sourceMappingURL=BicyclingLayer.svelte.d.ts.map