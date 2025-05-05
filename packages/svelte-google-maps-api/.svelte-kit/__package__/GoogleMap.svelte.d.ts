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
declare const GoogleMap: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    id?: string | undefined;
    options?: google.maps.MapOptions;
    onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onCenterChanged?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onLoad?: ((map: google.maps.Map) => void) | undefined;
    onUnmount?: ((map: google.maps.Map) => void) | undefined;
    mapContainerStyle?: string;
    mapContainerClassName?: string;
}, {
    loading: {};
    error: {};
    default: {};
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    loading: {};
    error: {};
    default: {};
}, {}, string>;
type GoogleMap = InstanceType<typeof GoogleMap>;
export default GoogleMap;
//# sourceMappingURL=GoogleMap.svelte.d.ts.map