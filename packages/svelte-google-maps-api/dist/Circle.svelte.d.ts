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
declare const Circle: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    center?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
    radius?: number | undefined | undefined;
    options?: google.maps.CircleOptions | undefined;
    draggable?: boolean | undefined | undefined;
    editable?: boolean | undefined | undefined;
    visible?: boolean | undefined | undefined;
    fillColor?: string | undefined | undefined;
    fillOpacity?: number | undefined | undefined;
    strokeColor?: string | undefined | undefined;
    strokeOpacity?: number | undefined | undefined;
    strokeWeight?: number | undefined | undefined;
    zIndex?: number | undefined | undefined;
    onCenterChanged?: (() => void) | undefined | undefined;
    onRadiusChanged?: (() => void) | undefined | undefined;
    onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined | undefined;
    onLoad?: ((circle: google.maps.Circle) => void) | undefined | undefined;
    onUnmount?: ((circle: google.maps.Circle) => void) | undefined | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Circle = InstanceType<typeof Circle>;
export default Circle;
//# sourceMappingURL=Circle.svelte.d.ts.map