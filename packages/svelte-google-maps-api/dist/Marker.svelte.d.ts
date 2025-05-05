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
declare const Marker: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    position: google.maps.LatLng | google.maps.LatLngLiteral;
    options?: google.maps.MarkerOptions;
    onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onClickableChanged?: (() => void) | undefined;
    onCursorChanged?: (() => void) | undefined;
    onAnimationChanged?: (() => void) | undefined;
    onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onDraggableChanged?: (() => void) | undefined;
    onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onFlatChanged?: (() => void) | undefined;
    onIconChanged?: (() => void) | undefined;
    onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onPositionChanged?: (() => void) | undefined;
    onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
    onShapeChanged?: (() => void) | undefined;
    onTitleChanged?: (() => void) | undefined;
    onVisibleChanged?: (() => void) | undefined;
    onZindexChanged?: (() => void) | undefined;
    onLoad?: ((marker: google.maps.Marker) => void) | undefined;
    onUnmount?: ((marker: google.maps.Marker) => void) | undefined;
    getMarkerInstance?: () => google.maps.Marker | null;
}, {
    default: {};
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {
    getMarkerInstance: () => google.maps.Marker | null;
}, string>;
type Marker = InstanceType<typeof Marker>;
export default Marker;
//# sourceMappingURL=Marker.svelte.d.ts.map