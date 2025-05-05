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
declare const Autocomplete: $$__sveltets_2_IsomorphicComponent<{
    options?: google.maps.places.AutocompleteOptions | undefined;
    value?: string;
    placeholder?: string | undefined;
    inputId?: string | undefined;
    inputClass?: string;
    inputStyle?: string;
    disabled?: boolean;
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined;
    componentRestrictions?: google.maps.places.ComponentRestrictions | undefined;
    fields?: string[] | undefined;
    strictBounds?: boolean | undefined;
    types?: string[] | undefined;
    onLoad?: ((autocomplete: google.maps.places.Autocomplete) => void) | undefined;
    onUnmount?: ((autocomplete: google.maps.places.Autocomplete) => void) | undefined;
}, {
    place_changed: CustomEvent<google.maps.places.PlaceResult>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Autocomplete = InstanceType<typeof Autocomplete>;
export default Autocomplete;
//# sourceMappingURL=Autocomplete.svelte.d.ts.map