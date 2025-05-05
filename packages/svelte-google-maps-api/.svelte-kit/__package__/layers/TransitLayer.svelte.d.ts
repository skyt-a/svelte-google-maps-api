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
declare const TransitLayer: $$__sveltets_2_IsomorphicComponent<{
    onLoad?: ((layer: google.maps.TransitLayer) => void) | undefined;
    onUnmount?: ((layer: google.maps.TransitLayer) => void) | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type TransitLayer = InstanceType<typeof TransitLayer>;
export default TransitLayer;
//# sourceMappingURL=TransitLayer.svelte.d.ts.map