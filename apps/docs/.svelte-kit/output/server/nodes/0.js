import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DlWDQohp.js","_app/immutable/chunks/Dpt-7wB9.js","_app/immutable/chunks/Jo_nZczK.js","_app/immutable/chunks/D0_yjw2a.js","_app/immutable/chunks/1m-1qmyz.js","_app/immutable/chunks/Camscgxd.js","_app/immutable/chunks/CmgaCqrq.js","_app/immutable/chunks/DUSzA03R.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/B-fCW7e8.js","_app/immutable/chunks/D3ssPK-Y.js"];
export const stylesheets = ["_app/immutable/assets/Expansion.BkqePQXH.css","_app/immutable/assets/0.CDkx3M21.css"];
export const fonts = ["_app/immutable/assets/Dank Mono Regular.CfN0Ttr4.otf","_app/immutable/assets/Dank Mono Italic.DdvTjQwK.otf"];
