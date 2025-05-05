import type { Library } from './types/googleMap.js';
type LoadStatus = 'loading' | 'loaded' | 'error';
export interface APIProviderContext {
    status: Writable<LoadStatus>;
    googleMapsApi: typeof google.maps | null;
    error: Error | null;
}
import { type Writable } from 'svelte/store';
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
declare const ApiProvider: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    apiKey?: string;
    libraries?: Library[];
    language?: string | undefined;
    region?: string | undefined;
    version?: string | undefined;
    solutionChannel?: string | undefined;
}, {
    loading: {};
    default: {};
    error: {
        error: null;
    };
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    loading: {};
    default: {};
    error: {
        error: null;
    };
}, {}, string>;
type ApiProvider = InstanceType<typeof ApiProvider>;
export default ApiProvider;
//# sourceMappingURL=APIProvider.svelte.d.ts.map