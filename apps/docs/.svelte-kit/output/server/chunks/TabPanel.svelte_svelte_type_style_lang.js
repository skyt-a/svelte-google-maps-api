import { M as spread_attributes, Q as store_get, J as escape_html, S as unsubscribe_stores, D as pop, B as push, O as attr, I as attr_class, R as stringify, P as spread_props, N as ensure_array_like, W as store_set, K as head } from "./index.js";
import "./client.js";
import { t as themeOptions, b as page, E as External, g as getPathFromBase, h as html, p as parseImageSrc, s as siteConfig, k as anchors, j as sidebar, f as showHeader } from "./Expansion.svelte_svelte_type_style_lang.js";
function Edit($$payload, $$props) {
  const { $$slots, $$events, ...rest } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      ...rest
    },
    null,
    void 0,
    void 0,
    3
  )}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path><path d="M14 2v6h6m-9.58 4.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21L4 22l.99-3.95l5.43-5.44Z"></path></g></svg>`;
}
function EditPage($$payload, $$props) {
  push();
  var $$store_subs;
  store_get($$store_subs ??= {}, "$page", page).route.id;
  const DEFAULT_TEXT = "Suggest changes to this page";
  $$payload.out += `<div class="edit-link svelte-qokob7" role="link" tabindex="0"><div class="edit-icon svelte-qokob7">`;
  Edit($$payload, {});
  $$payload.out += `<!----></div> <div class="edit-text svelte-qokob7">${escape_html(themeOptions.i18n?.suggestChangesToThisPage || DEFAULT_TEXT)}</div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function ActionButton($$payload, $$props) {
  push();
  let { label, type = "", to, external = false } = $$props;
  $$payload.out += `<a${attr("href", external ? to : getPathFromBase(to))}${attr_class(`svp-action ${type ? `svp-action--${type}` : ""}`, "svelte-t0q6fs")}${attr("target", external ? "_blank" : "")}><span class="label svelte-t0q6fs">${escape_html(label)}</span> `;
  if (external) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="external-icon svelte-t0q6fs">`;
    External($$payload, {});
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></a>`;
  pop();
}
function IconifyIcon($$payload, $$props) {
  const {
    collection,
    name,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  $$payload.out += `<div${attr_class(`i-${stringify(collection)}-${stringify(name)}`)}></div>`;
}
function Apple($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 72 72"><path fill="#ea5a47" d="M53.88 21.51a11.417 11.417 0 0 0-10.737.504a2.156 2.156 0 0 0-.109.052a22.914 22.914 0 0 1-7.567 1.877a15.907 15.907 0 0 1-6.638-1.85l-.141-.076a11.41 11.41 0 0 0-10.764-.506C10.7 25.14 8.1 36.69 12.129 47.254c2.373 6.232 6.685 11.08 11.535 12.966a10.983 10.983 0 0 0 9.134-.266a11.377 11.377 0 0 0 1.532-.931a2.726 2.726 0 0 1 3.158 0a11.173 11.173 0 0 0 1.532.932a10.465 10.465 0 0 0 4.735 1.127a12.078 12.078 0 0 0 4.383-.86c4.851-1.885 9.165-6.733 11.539-12.967c4.03-10.57 1.43-22.12-5.797-25.745Z"></path><path fill="#f4aa41" d="M48.999 21.405a1.074 1.074 0 0 0-.246.01l.038-.227c.076.075.142.141.208.217Z"></path><path fill="#d22f27" d="M53.883 21.511a10.367 10.367 0 0 0-4.902-1.106a1 1 0 0 0-.696 1.7c9.444 9.624 6.388 19.16 3.727 23.988c-3.892 7.058-10.844 11.465-14.457 10.68a1 1 0 0 0-.672 1.865a15.513 15.513 0 0 0 7.169 1.898a12.895 12.895 0 0 0 4.629-.863c4.66-1.776 8.668-6.304 10.995-12.422c4.035-10.568 1.438-22.115-5.793-25.74Z"></path><path fill="#b1cc33" d="M48.044 17.395c3.957 1.329 6.845 5.819 6.845 5.819s-5.014 1.835-8.97.506c-3.95-1.327-6.844-5.82-6.844-5.82s5.019-1.833 8.97-.505Z"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M35.046 20.733v-5.461l-4.344-4.343m26.632 14.837c3.648 4.949 4.396 13.296 1.409 21.133c-3.857 10.128-12.488 15.573-19.274 12.163a10.24 10.24 0 0 1-1.394-.85a3.713 3.713 0 0 0-4.331 0a10.27 10.27 0 0 1-1.396.85c-6.797 3.41-15.428-2.035-19.285-12.163c-3.856-10.118-1.475-21.085 5.31-24.494a10.42 10.42 0 0 1 9.838.491s.056.034.168.09a16.863 16.863 0 0 0 7.088 1.957a13.271 13.271 0 0 0 2.249-.215a18.634 18.634 0 0 0 2.126-.463m8.202-6.87c3.957 1.329 6.845 5.819 6.845 5.819s-5.014 1.835-8.97.506c-3.95-1.327-6.844-5.82-6.844-5.82s5.019-1.833 8.97-.505Z"></path></svg>`;
}
function Banana($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 72 72"><g strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".75"><path fill="#fcea2b" stroke="#fcea2b" d="M50.46 50.44c-11.2 13.24-28.24 12.54-35.31 6.547l-.413-1.901c12.72-3.783 15.02-2.284 25.01-11.49c5.776-6.855 10.6-16.93 10.32-24.26c6.04-.188 0 0 4.682-.188c3.885 9.76 2.355 22.91-4.282 31.29z"></path><path fill="#f1b31c" stroke="#f1b31c" d="M53.21 19.66c4.526-.424 5.228 22.66-1.408 31.04c-11.8 11.01-24.25 12.1-36.84 5.362c25.96 5.489 39.47-15.38 38.25-36.4z"></path></g><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"><path d="m52.09 15.49l-.57-4.29M25.79 56.55c16.7-2.905 24.45-11.14 26.67-27.09"></path><path d="M47.54 54.03c-8.106 7.212-23.05 9.45-32.43 2.757l-.413-1.901c18.42-2.206 32.78-13.96 35.36-35.55c1.105-.004 4.645-.396 4.645-.396c5.599 15.1 1.754 27.15-7.164 35.08z"></path></g></svg>`;
}
function Grapes($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 72 72"><path fill="#b399c8" d="M32.33 37.54a6.688 6.688 0 0 1-6.688 6.688a6.688 6.688 0 0 1-6.688-6.688a6.688 6.688 0 0 1 6.688-6.688a6.688 6.688 0 0 1 6.688 6.688"></path><path fill="#b399c8" d="M27.88 27.51a6.688 6.688 0 0 1-6.688 6.688a6.688 6.688 0 0 1-6.688-6.688a6.688 6.688 0 0 1 6.688-6.688a6.688 6.688 0 0 1 6.688 6.688"></path><path fill="#b399c8" d="M31.22 34.2a6.684 6.684 0 1 0-5.897-3.531M49.05 47.58a6.688 6.688 0 0 1-6.688 6.688a6.688 6.688 0 0 1-6.688-6.688a6.688 6.688 0 0 1 6.688-6.688a6.688 6.688 0 0 1 6.688 6.688"></path><path fill="#b399c8" d="M37.91 47.58a6.688 6.688 0 0 1-6.688 6.688a6.688 6.688 0 0 1-6.688-6.688a6.688 6.688 0 0 1 6.688-6.688a6.688 6.688 0 0 1 6.688 6.688m17.83-10.04a6.688 6.688 0 0 1-6.688 6.688a6.688 6.688 0 0 1-6.688-6.688a6.688 6.688 0 0 1 6.688-6.688a6.688 6.688 0 0 1 6.688 6.688"></path><path fill="#b399c8" d="M43.48 36.43a6.688 6.688 0 0 1-6.688 6.688a6.688 6.688 0 0 1-6.688-6.688a6.688 6.688 0 0 1 6.688-6.688a6.688 6.688 0 0 1 6.688 6.688"></path><path fill="#8967aa" d="M36.57 29.13a6.688 6.688 0 0 1 0 13.38m21.25-15.33c0 3.693-1.239 5.486-4.762 4.377c-4.713-1.483-8.869.091-8.613-4.377c.212-3.687 2.994-6.688 6.688-6.688s6.688 2.994 6.688 6.688"></path><path fill="#b399c8" d="M47.22 30.54a6.678 6.678 0 1 0-4.165 3.415m.425 23.655a6.688 6.688 0 0 1-6.688 6.688a6.688 6.688 0 0 1-6.688-6.688a6.688 6.688 0 0 1 6.688-6.688a6.688 6.688 0 0 1 6.688 6.688"></path><path fill="#8967aa" d="M36.57 50.92a6.688 6.688 0 0 1 0 13.38"></path><path fill="#8967aa" d="M42.16 40.89a6.688 6.688 0 0 1 0 13.38m6.81-23.48a6.688 6.688 0 0 1 0 13.38m-7.89-23.29a6.688 6.688 0 0 1 0 13.38"></path><g fill="none" stroke="#000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M37.01 21.82c-1.343-7.331-6.229-22.43-22.85-7.574"></path><path strokeMiterlimit="10" d="M54.34 32.9a6.679 6.672 0 1 0-8.112-10.32"></path><path strokeMiterlimit="10" strokeWidth="2" d="M30.48 40.42a6.625 6.619 0 0 1-.949-3.418a6.706 6.699 0 0 1 5.462-6.562"></path><ellipse cx="36.57" cy="57.34" strokeMiterlimit="10" strokeWidth="2" rx="6.721" ry="6.715"></ellipse><path strokeMiterlimit="10" strokeWidth="2" d="M36.57 50.62a6.721 6.715 0 0 0 0 13.43m5.6-10.07q.255 0 .506-.019m-.006-.001a6.718 6.711 0 1 0-6.551-3.756"></path><path strokeMiterlimit="10" strokeWidth="2" d="M36.37 43.28a6.721 6.715 0 1 0-6.042 10.67M43.13 33.73a6.732 6.725 0 0 0-.28 6.416"></path><path strokeMiterlimit="10" strokeWidth="2" d="M47.91 43.84a6.721 6.715 0 1 0-4.783-10.11m-12.717-.98a6.721 6.715 0 1 0-6.157 11.06m-.003 0a6.775 6.768 0 0 0 1.112.091"></path><path strokeMiterlimit="10" strokeWidth="2" d="M54.5 32.93a6.721 6.715 0 1 0-8.322-10.35"></path><path strokeMiterlimit="10" strokeWidth="2" d="M46.68 30.78a6.708 6.701 0 1 0-3.669 2.765"></path><path strokeMiterlimit="10" strokeWidth="2" d="M35.83 22.48a6.723 6.716 0 0 0-10.9 7.582"></path><path strokeMiterlimit="10" strokeWidth="2" d="M25.64 22.37a6.721 6.715 0 1 0-6.216 11.3"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M50.57 9.212s-3.357 7.635-15.68 5.496"></path></g></svg>`;
}
function Peach($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 72 72"><g strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"><path fill="#b1cc33" stroke="#b1cc33" d="M58.613 14.83s-3.721 6.953-9.376 9.376c-4.44 1.905-10.081 1.007-12.297.545c-2.224.417-7.882 1.2-12.282-.796c-5.605-2.537-9.183-9.564-9.183-9.564s7.63-1.942 13.234.595c1.205.542 2.307 1.284 3.309 2.124c3.786 3.185 4.813 3.56 10 .102c1.018-.82 2.135-1.538 3.35-2.056c5.656-2.423 13.245-.325 13.245-.325z"></path><path fill="#FFA7C0" stroke="#FFA7C0" strokeLinecap="round" d="M60.72 39.78c-.31 12.69-11.44 22.65-24.01 24.2c-.05.01-.1.01-.15.02h-.11c-.21 0-.41-.01-.63-.02c-11.34-2.56-22.28-12.53-23.42-24.2c0-1.76.19-3.49.55-5.15c.64-2.99 1.85-5.78 3.49-8.25c2.64-2.89 6.55-4.71 10.92-4.71c2.27 0 4.4.48 6.31 1.35c1.29.59 2.73.74 4.09.44c.45-.09.9-.24 1.33-.44c1.9-.87 4.04-1.35 6.3-1.35c4.88 0 9.2 2.27 11.8 5.76c.29.37.54.75.78 1.14c.49.93.91 1.89 1.28 2.88c.01.02.02.03.02.05c.12.32.23.65.33.98c.09.29.18.58.26.87c.07.26.14.51.2.77c.37 1.56.59 3.18.65 4.83c.01.28.01.55.01.83z"></path><path fill="#E67A94" stroke="#E67A94" d="M37.76 23.46c1.05-.2 2.05-.36 2.99-.46c-1.72.3-3.29.57-3.63.6c.22-.05.43-.1.64-.14zm22.96 16.32c-.31 12.69-11.44 22.65-24.01 24.2C56.924 59.261 68.125 20.056 40.75 23c2.16-.37 4.57-.77 5.09-.77c4.61 0 8.72 2.03 11.35 5.2c.29.37.54.75.78 1.14c.49.93.91 1.89 1.28 2.88c.01.02.02.03.02.05c.12.32.23.65.33.98c.09.29.18.58.26.87c.07.26.14.51.2.77c.39 1.56.62 3.17.65 4.83c.01.28.01.55.01.83z"></path><path fill="none" stroke="#E67A94" strokeLinecap="round" d="M37.72 36.595c-.719-3.444-3.407-5.532-3.407-5.532"></path></g><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"><path d="M41.961 17.325c1.006-.828 2.118-1.563 3.32-2.092c5.633-2.48 13.249-.452 13.249-.452"></path><path d="M58.53 14.78s-1.1 2.105-3.023 4.413M31.64 16.83c-1.005-.828-2.118-1.563-3.32-2.092c-5.633-2.479-13.248-.452-13.248-.452m0 0s1.024 1.961 2.825 4.174m18.548-3.094c-.32-2.33-1.153-5.64-3.308-7.904M60.72 39.78c-.31 12.69-11.44 22.65-24.01 24.2c-.05.01-.1.01-.15.02h-.11c-.21 0-.42.03-.63-.02c-11.34-2.56-22.28-12.53-23.42-24.2c-.17-1.75.19-3.49.55-5.15c.64-2.99 1.85-5.78 3.49-8.25c2.64-2.89 6.55-4.71 10.92-4.71c2.27 0 4.4.48 6.31 1.35c1.29.59 2.73.74 4.09.44c.45-.09.9-.24 1.33-.44c1.9-.87 4.04-1.35 6.3-1.35c4.88 0 9.2 2.27 11.8 5.76c.29.37.54.75.78 1.14c.49.93.91 1.89 1.28 2.88c.01.02.02.03.02.05c.12.32.23.65.33.98c.09.29.18.58.26.87c.07.26.14.51.2.77c.39 1.56.62 3.17.65 4.83c.01.28.01.55.01.83z"></path><path d="M40.987 52.864c2.042-7.167 3.244-17.616-3.737-24.614"></path></g></svg>`;
}
function Tomato($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 72 72"><g strokeLinejoin="round" strokeMiterlimit="10"><ellipse cx="35.825" cy="37.597" fill="#EA5A47" stroke="#EA5A47" strokeLinecap="round" strokeWidth="1.8" rx="25.015" ry="22.382"></ellipse><path fill="#D22F27" stroke="#D22F27" strokeWidth="1.8" d="M60.528 37.597c0 12.365-10.89 22.382-24.703 22.382c17.4-4.104 31.96-32.932 0-44.763c5.085 0 9.816 1.357 13.765 3.69c6.777 4.003 10.938 10.879 10.938 18.691z"></path><path fill="#B1CC33" d="M46.325 15.849c-.385 1.382-.994 3.031-2.436 4.235C38 25 30.25 23.288 26.817 20.084c-1.36-1.284-2.04-2.853-2.424-4.235c-.637-2.282-.362-4.17-.362-4.17s2.282-.328 4.838.582a9.71 9.71 0 0 1 2.622 1.405c.483-3.369 2.732-5.618 3.555-6.342l.307-.252l.307.252c.823.724 3.072 2.973 3.555 6.342a9.716 9.716 0 0 1 2.622-1.405c2.557-.91 4.839-.581 4.839-.581s.285 1.887-.352 4.169z"></path></g><g fill="none" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"><path strokeLinecap="round" d="M50.307 19.346c6.375 4.057 10.533 10.72 10.533 18.252c0 12.36-11.2 22.381-25.015 22.381S10.81 49.96 10.81 37.597c0-7.374 3.986-13.915 10.136-17.993"></path><path d="M46.325 15.849c-.385 1.382-.994 3.031-2.436 4.235C38 25 30.25 23.288 26.817 20.084c-1.36-1.284-2.04-2.853-2.424-4.235c-.637-2.282-.362-4.17-.362-4.17s2.282-.328 4.838.582a9.71 9.71 0 0 1 2.622 1.405c.483-3.369 2.732-5.618 3.555-6.342l.307-.252l.307.252c.823.724 3.072 2.973 3.555 6.342a9.716 9.716 0 0 1 2.622-1.405c2.557-.91 4.839-.581 4.839-.581s.285 1.887-.352 4.169z"></path></g></svg>`;
}
function Watermelon($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 72 72"><g strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"><path fill="#B1CC33" d="M55.226 56.78c-10.988 10.977-28.78 10.977-39.768 0c-10.976-10.987-10.976-28.779 0-39.767l2.654 2.654c-9.525 9.515-9.525 24.945 0 34.46c9.515 9.525 24.945 9.525 34.46 0l2.654 2.654z"></path><path fill="#EA5A47" stroke="#EA5A47" strokeLinecap="round" d="M52.572 54.127c-9.515 9.525-24.945 9.525-34.46 0c-9.526-9.515-9.526-24.945 0-34.46l34.46 34.46"></path><path fill="#EA5A47" d="M49.524 56.718c-9.52 6.837-22.857 5.973-31.412-2.592c-8.62-8.61-9.44-22.063-2.46-31.594"></path></g><path fill="none" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M55.226 56.78c-10.988 10.977-28.78 10.977-39.768 0c-10.976-10.987-10.976-28.779 0-39.767l2.654 2.654c-9.525 9.515-9.525 24.945 0 34.46c9.515 9.525 24.945 9.525 34.46 0l2.654 2.654z"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="m17.516 19.071l36.206 36.206m-4.198 1.441c-9.52 6.837-22.857 5.973-31.412-2.592c-8.62-8.61-9.44-22.063-2.46-31.594"></path><ellipse cx="31.83" cy="46.907" rx="1.687" ry=".844" transform="rotate(-45.001 31.83 46.908)"></ellipse><ellipse cx="44.554" cy="53.269" rx="1.687" ry=".844" transform="rotate(-45.001 44.554 53.27)"></ellipse><ellipse cx="31.83" cy="54.86" rx="1.687" ry=".844" transform="rotate(-45.001 31.83 54.86)"></ellipse><ellipse cx="25.817" cy="40.894" rx="1.687" ry=".844" transform="rotate(-45.001 25.816 40.894)"></ellipse><ellipse cx="19.455" cy="28.17" rx="1.687" ry=".844" transform="rotate(-45.001 19.454 28.17)"></ellipse><ellipse cx="17.864" cy="40.894" rx="1.687" ry=".844" transform="rotate(-45.001 17.864 40.894)"></ellipse><ellipse cx="22.281" cy="50.086" rx="1.687" ry=".844" transform="rotate(-45.001 22.28 50.087)"></ellipse></svg>`;
}
function Feature($$payload, $$props) {
  push();
  const {
    onkeypress = void 0,
    i,
    title,
    description,
    link = void 0,
    icon = void 0
  } = $$props;
  const external = /^https?/.test(link);
  const icons = {
    Apple,
    Banana,
    Grapes,
    Peach,
    Tomato,
    Watermelon
  };
  const iconsArray = Object.values(icons);
  $$payload.out += `<div${attr_class("feature-item svelte-1xkvyj9", void 0, { "clickable": link })} role="link" tabindex="0"><div class="flex justify-between items-start"><div class="icon svelte-1xkvyj9">`;
  if (icon === void 0) {
    $$payload.out += "<!--[-->";
    const SvelteComponent = iconsArray[i % iconsArray.length];
    $$payload.out += `<!---->`;
    SvelteComponent($$payload, {});
    $$payload.out += `<!---->`;
  } else if (icon.type === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `${html(icon.value)}`;
  } else if (icon.type === "iconify") {
    $$payload.out += "<!--[2-->";
    IconifyIcon($$payload, spread_props([icon]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (external) {
    $$payload.out += "<!--[-->";
    External($$payload, {});
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="feature-title svelte-1xkvyj9">${escape_html(title)}</div> <div class="feature-desc svelte-1xkvyj9">${escape_html(description)}</div></div>`;
  pop();
}
function Home($$payload, $$props) {
  push();
  const {
    features = [],
    actions = [],
    tagline = "",
    siteConfig: siteConfig2,
    heroImage
  } = $$props;
  const each_array = ensure_array_like(actions);
  const each_array_1 = ensure_array_like(features);
  $$payload.out += `<div class="home-page svelte-1kve85y"><div class="title svelte-1kve85y"><div class="intro svelte-1kve85y"><div class="gradient-title svelte-1kve85y">${escape_html(siteConfig2.title)}</div> <div class="description svelte-1kve85y">${escape_html(siteConfig2.description)}</div> `;
  if (tagline) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="tagline svelte-1kve85y">${escape_html(tagline)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  heroImage($$payload);
  $$payload.out += `<!----></div> <div class="actions svelte-1kve85y"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let action = each_array[$$index];
    ActionButton($$payload, spread_props([action]));
  }
  $$payload.out += `<!--]--></div> <div class="features svelte-1kve85y"><!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let fe = each_array_1[i];
    Feature($$payload, spread_props([fe, { i }]));
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function HeroImage($$payload, $$props) {
  push();
  const { heroImage } = $$props;
  $$payload.out += `<div class="hero-image svelte-drr7t8"><img${attr("src", parseImageSrc(heroImage))}${attr("alt", siteConfig.title)} width="192" class="svelte-drr7t8"></div>`;
  pop();
}
function LastUpdate($$payload, $$props) {
  push();
  const { lastUpdate = "" } = $$props;
  const DEFAULT_TEXT = "Last update at:";
  if (lastUpdate) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="last-update svelte-1mlgib2">${escape_html(themeOptions.i18n?.lastUpdateAt || DEFAULT_TEXT)}
    ${escape_html(lastUpdate)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function PageLayout($$payload, $$props) {
  push();
  var $$store_subs;
  const routeId = store_get($$store_subs ??= {}, "$page", page).route.id;
  const { fm, children, heroImage } = $$props;
  const {
    title,
    description,
    pageType,
    lastUpdate,
    anchors: fmAnchors = [],
    home,
    sidebar: fmSidebar = true,
    header = true
  } = fm;
  store_set(sidebar, fmSidebar);
  store_set(showHeader, header);
  const isHome = routeId === "/";
  anchors.set(fmAnchors);
  function defaultHeroImage($$payload2) {
    HeroImage($$payload2, { heroImage: fm.heroImage });
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title ? `${title} - ${siteConfig.title}` : siteConfig.title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", description || siteConfig.description)}>`;
  });
  if (!isHome) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div pb-4="" class="theme-default--page-layout"><div class="content svelte-1ux3nlv">`;
    if (title) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<h1 class="page-title svelte-1ux3nlv">${escape_html(title)}</h1>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    children?.($$payload);
    $$payload.out += `<!----> <div${attr_class("meta svelte-1ux3nlv", void 0, { "without-edit-link": !themeOptions.editLink })}>`;
    if (themeOptions.editLink) {
      $$payload.out += "<!--[-->";
      EditPage($$payload);
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    LastUpdate($$payload, { lastUpdate });
    $$payload.out += `<!----></div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (home !== false) {
      $$payload.out += "<!--[-->";
      Home($$payload, spread_props([
        fm,
        {
          siteConfig,
          heroImage: heroImage ?? defaultHeroImage
        }
      ]));
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    children?.($$payload);
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  PageLayout as P
};
