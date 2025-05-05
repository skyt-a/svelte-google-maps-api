import { E as current_component, F as attr_style, G as bind_props, D as pop, B as push, I as attr_class, J as escape_html, K as head, M as spread_attributes, N as ensure_array_like, O as attr, P as spread_props, Q as store_get, R as stringify, S as unsubscribe_stores, C as setContext } from "../../chunks/index.js";
import "../../chunks/client.js";
import { h as html, t as themeOptions, E as External, g as getPathFromBase, s as siteConfig, p as parseImageSrc, a as tocCollapsed, n as navCollapsed, i as isDark, b as page, c as scrollDirection, r as resolvedSidebar, d as sidebarCollapsed, e as resolveSidebar, f as showHeader, j as sidebar, k as anchors } from "../../chunks/Expansion.svelte_svelte_type_style_lang.js";
import { L as Link } from "../../chunks/Link.js";
import { E as Expansion, A as ArrowDown } from "../../chunks/Expansion.js";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
var SVELTEPRESS_CONTEXT_KEY = Symbol("sveltepress");
function AjaxBar($$payload, $$props) {
  push();
  let barWidth = 0;
  let startedFlag;
  let interval = 200;
  onDestroy(() => {
    if (startedFlag) clearTimeout(startedFlag);
  });
  function start() {
    if (startedFlag) clearTimeout(startedFlag);
    barWidth = 0;
    interval = 200;
    const next = () => {
      barWidth += 1;
      interval += Math.floor(Math.random() * 200);
      startedFlag = setTimeout(next, interval);
    };
    next();
  }
  function end() {
    if (barWidth > 0) barWidth = 100;
    if (startedFlag) clearInterval(startedFlag);
    setTimeout(
      () => {
        barWidth = 0;
      },
      100
    );
  }
  $$payload.out += `<div class="ajax-bar svelte-1l1j860"${attr_style(`--ajax-bar-width: ${barWidth}%;`)}><div class="progress svelte-1l1j860"></div></div>`;
  bind_props($$props, { start, end });
  pop();
}
function Backdrop($$payload, $$props) {
  push();
  const { show = false, top = 0, zIndex = 900 } = $$props;
  $$payload.out += `<div${attr_class("backdrop svelte-112ytuk", void 0, { "show": show })} role="none"${attr_style("", { top, "z-index": zIndex })}></div>`;
  pop();
}
function Home($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494l9-8zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333l-6 5.333zM13 19v-4h-2v4h2z"></path></svg>`;
}
function Error($$payload, $$props) {
  push();
  const { error = {} } = $$props;
  $$payload.out += `<div class="error svelte-19szbev"><div class="code svelte-19szbev">${escape_html(error.code || 404)}</div> <div class="title svelte-19szbev">${escape_html(error.message || "Not Found")}</div> `;
  {
    let pre = function($$payload2) {
      $$payload2.out += `<div class="home-icon svelte-19szbev">`;
      Home($$payload2);
      $$payload2.out += `<!----></div>`;
    };
    Link($$payload, {
      label: "Take me home",
      to: "/",
      pre
    });
  }
  $$payload.out += `<!----></div>`;
  pop();
}
function GoogleAnalytics($$payload, $$props) {
  push();
  const ga = themeOptions.ga;
  head($$payload, ($$payload2) => {
    if (ga) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `${html(`<${"script"} async src="${`https://www.googletagmanager.com/gtag/js?id=${ga}`}"></${"script"}>
    <${"script"}>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', '${ga}')
  </${"script"}>
  `)}`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  });
  pop();
}
function Discord($$payload, $$props) {
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
  )}><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"></path></svg>`;
}
function Github($$payload, $$props) {
  const { $$slots, $$events, ...rest } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      ...rest
    },
    null,
    void 0,
    void 0,
    3
  )}><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>`;
}
function NavArrowDown($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"></path></svg>`;
}
function NavItem($$payload, $$props) {
  push();
  const {
    title = "",
    to = "/",
    items = [],
    icon = false,
    external = false,
    builtInIcon = false,
    children,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  if (items && items.length) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(items);
    $$payload.out += `<div${attr_class("nav-item svelte-n7rcpm", void 0, {
      "built-in-icon": builtInIcon,
      "nav-item--icon": icon,
      "nav-item--user-icon": icon
    })} role="link"${attr("aria-label", title)}>`;
    if (typeof icon === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `${html(icon)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(title)} <div class="arrow svelte-n7rcpm">`;
      NavArrowDown($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]--> <div class="dropdown svelte-n7rcpm"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let subItem = each_array[$$index];
      NavItem($$payload, spread_props([subItem]));
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<a${spread_attributes(
      {
        href: external ? to : getPathFromBase(to),
        class: "nav-item",
        ...external ? { target: "_blank" } : {},
        "aria-label": title
      },
      "svelte-n7rcpm",
      { "nav-item--icon": icon }
    )}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      if (typeof icon === "string") {
        $$payload.out += "<!--[-->";
        $$payload.out += `${html(icon)}`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(title)}`;
      }
      $$payload.out += `<!--]--> `;
      if (external) {
        $$payload.out += "<!--[-->";
        External($$payload, {});
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></a>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Logo($$payload, $$props) {
  push();
  NavItem($$payload, {
    to: getPathFromBase("/"),
    title: siteConfig.title,
    children: ($$payload2) => {
      {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<img class="logo svelte-1yz1vbk" height="32"${attr("src", parseImageSrc(themeOptions.logo))}${attr("alt", siteConfig.title)}> <span class="title svelte-1yz1vbk">${escape_html(siteConfig.title)}</span>`;
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  pop();
}
function MenuOpen($$payload, $$props) {
  const { $$slots, $$events, ...all } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      ...all
    },
    null,
    void 0,
    void 0,
    3
  )}><path fill="currentColor" d="M4 18h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h8c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1m17.3 7.88L17.42 12l2.88-2.88a.996.996 0 1 0-1.41-1.41L15.3 11.3a.996.996 0 0 0 0 1.41l3.59 3.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42"></path></svg>`;
}
const DEFAULT_ON_THIS_PAGE = "On this page";
function Toc($$payload, $$props) {
  push();
  var $$store_subs;
  const { anchors: anchors2 = [] } = $$props;
  let activeIdx = 0;
  if (anchors2.length) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(anchors2);
    $$payload.out += `<div${attr_class("toc svelte-hdmw85", void 0, {
      "collapsed": store_get($$store_subs ??= {}, "$tocCollapsed", tocCollapsed)
    })}><div class="title svelte-hdmw85">${escape_html(themeOptions?.i18n?.onThisPage || DEFAULT_ON_THIS_PAGE)}</div> <div class="anchors svelte-hdmw85"${attr_style(`--bar-top: calc(${activeIdx * 2}em);`)}><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let an = each_array[i];
      const active = activeIdx === i;
      $$payload.out += `<a${attr("href", `#${stringify(an.slugId)}`)}${attr_class("item svelte-hdmw85", void 0, { "active": active })}${attr_style(`--heading-depth: ${stringify(an.depth < 2 ? 2 : an.depth)};`)}>${escape_html(an.title)}</a>`;
    }
    $$payload.out += `<!--]--> <div class="active-bar svelte-hdmw85"></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  Backdrop($$payload, {
    show: !store_get($$store_subs ??= {}, "$tocCollapsed", tocCollapsed)
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function MobileSubNav($$payload, $$props) {
  push();
  $$payload.out += `<nav class="sub-nav svelte-1wmcpxl" aria-label="Browse docs"><div role="button" tabindex="0" class="text-6">`;
  MenuOpen($$payload, {});
  $$payload.out += `<!----></div> <div role="button" tabindex="0">${escape_html(themeOptions?.i18n?.onThisPage || DEFAULT_ON_THIS_PAGE)}</div></nav>`;
  pop();
}
function TocClose($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M5 5L19 5"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5;M5 5L19 19"></animate></path><path d="M5 12H19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set attributeName="opacity" begin="0.4s" to="0"></set></path><path d="M5 19L19 19"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 19L19 19;M5 19L19 5"></animate></path></g></svg>`;
}
function TocMenu($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M5 5L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19;M5 5L19 5"></animate></path><path d="M12 12H12" opacity="0"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"></animate><set attributeName="opacity" begin="0.2s" to="1"></set></path><path d="M5 19L19 5"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 19L19 5;M5 19L19 19"></animate></path></g></svg>`;
}
function NavbarMobile($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div class="nav-trigger svelte-u9xvkm" role="menu" tabindex="0">`;
  if (store_get($$store_subs ??= {}, "$navCollapsed", navCollapsed)) {
    $$payload.out += "<!--[-->";
    TocMenu($$payload);
  } else {
    $$payload.out += "<!--[!-->";
    TocClose($$payload);
  }
  $$payload.out += `<!--]--></div> `;
  if (!store_get($$store_subs ??= {}, "$navCollapsed", navCollapsed)) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(themeOptions.navbar);
    $$payload.out += `<nav class="navbar-mobile svelte-u9xvkm" aria-label="Menu">`;
    Logo($$payload);
    $$payload.out += `<!----> <!--[-->`;
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let navItem = each_array[$$index_1];
      if (navItem.items) {
        $$payload.out += "<!--[-->";
        {
          let customTitle = function($$payload2) {
            $$payload2.out += `<div>`;
            if (navItem.icon) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<div class="text-6">${html(navItem.icon)}</div>`;
            } else {
              $$payload2.out += "<!--[!-->";
              $$payload2.out += `${escape_html(navItem.title)}`;
            }
            $$payload2.out += `<!--]--></div>`;
          };
          Expansion($$payload, {
            title: navItem.title,
            showIcon: false,
            customTitle,
            children: ($$payload2) => {
              const each_array_1 = ensure_array_like(navItem.items);
              $$payload2.out += `<!--[-->`;
              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                let subItem = each_array_1[$$index];
                NavItem($$payload2, spread_props([subItem]));
              }
              $$payload2.out += `<!--]-->`;
            }
          });
        }
      } else {
        $$payload.out += "<!--[!-->";
        NavItem($$payload, spread_props([navItem]));
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></nav>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Search($$payload, $$props) {
  push();
  const {
    appId,
    apiKey,
    indexName,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  $$payload.out += `<div id="docsearch"></div>`;
  pop();
}
function Moon($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><g strokeDasharray="2"><path d="M12 21v1M21 12h1M12 3v-1M3 12h-1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;2"></animate></path><path d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="4;2"></animate></path></g><path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" opacity="0"><set attributeName="opacity" begin="0.5s" to="1"></set></path></g><g fill="currentColor" fillOpacity="0"><path d="m15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z"><animate id="lineMdSunnyOutlineToMoonLoopTransition0" fill="freeze" attributeName="fill-opacity" begin="0.6s;lineMdSunnyOutlineToMoonLoopTransition0.begin+6s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+2.2s" dur="0.4s" values="1;0"></animate></path><path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+3s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+5.2s" dur="0.4s" values="1;0"></animate></path><path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+0.4s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+2.8s" dur="0.4s" values="1;0"></animate></path><path d="m20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+3.4s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+5.6s" dur="0.4s" values="1;0"></animate></path></g><mask id="lineMdSunnyOutlineToMoonLoopTransition1"><circle cx="12" cy="12" r="12" fill="#fff"></circle><circle cx="12" cy="12" r="4"><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="4;8"></animate></circle><circle cx="22" cy="2" r="3" fill="#fff"><animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18"></animate><animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6"></animate><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="3;12"></animate></circle><circle cx="22" cy="2" r="1"><animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18"></animate><animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6"></animate><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="1;10"></animate></circle></mask><circle cx="12" cy="12" r="6" fill="currentColor" mask="url(#lineMdSunnyOutlineToMoonLoopTransition1)"><set attributeName="opacity" begin="0.5s" to="0"></set><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="6;10"></animate></circle></svg>`;
}
function Sun($$payload) {
  $$payload.out += `<svg width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeDasharray="2" strokeDashoffset="2" strokeLinecap="round" strokeWidth="2"><path d="M0 0"><animate fill="freeze" attributeName="d" begin="1.2s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s" values="2;0"></animate></path><path d="M0 0"><animate fill="freeze" attributeName="d" begin="1.5s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.5s" dur="1.2s" values="2;0"></animate></path><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></g><g fill="currentColor"><path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z"><animate fill="freeze" attributeName="fill-opacity" dur="0.4s" values="1;0"></animate></path><path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.2s" dur="0.4s" values="1;0"></animate></path></g><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"></path><set attributeName="opacity" begin="0.6s" to="0"></set></g><mask id="lineMdMoonToSunnyOutlineLoopTransition0"><circle cx="12" cy="12" r="12" fill="#fff"></circle><circle cx="12" cy="12" r="8"><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="8;4"></animate></circle><circle cx="18" cy="6" r="12" fill="#fff"><animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22"></animate><animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2"></animate><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="12;3"></animate></circle><circle cx="18" cy="6" r="10"><animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22"></animate><animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2"></animate><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;1"></animate></circle></mask><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#lineMdMoonToSunnyOutlineLoopTransition0)" opacity="0"><set attributeName="opacity" begin="0.6s" to="1"></set><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;6"></animate></circle></svg>`;
}
function ToggleDark($$payload, $$props) {
  push();
  var $$store_subs;
  const key = "SVELTEPRESS_DARK_MODE";
  const themeColor = themeOptions.themeColor || { light: "#fff", dark: "#000" };
  head($$payload, ($$payload2) => {
    $$payload2.out += `<meta id="theme-color" name="theme-color"${attr("content", themeColor.light || "#fff")}> ${html(`
<${"script"}>
  const themeColor = JSON.parse('${JSON.stringify(themeColor)}')
  if (window.localStorage.getItem('${key}') === 'on') {
    document.querySelector('html').classList.add('dark')
    document.getElementById('theme-color').setAttribute('content', themeColor ? themeColor.dark : '#ffffff')
  }
 else {
    document.querySelector('html').classList.remove('dark')
    document.getElementById('theme-color').setAttribute('content', themeColor ? themeColor.light : '#ffffff')
  }
</${"script"}>`)}`;
  });
  $$payload.out += `<div class="toggle svelte-8qls77" aria-label="Toggle dark mode" role="button" tabindex="0">`;
  if (store_get($$store_subs ??= {}, "$isDark", isDark)) {
    $$payload.out += "<!--[-->";
    Moon($$payload);
  } else {
    $$payload.out += "<!--[!-->";
    Sun($$payload);
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Navbar($$payload, $$props) {
  push();
  var $$store_subs;
  const routeId = store_get($$store_subs ??= {}, "$page", page).route.id;
  const isHome = routeId === "/";
  const hasError = store_get($$store_subs ??= {}, "$page", page).error;
  const each_array = ensure_array_like(themeOptions.navbar);
  $$payload.out += `<header${attr_class("header svelte-1w0cm6h", void 0, {
    "hidden-in-mobile": store_get($$store_subs ??= {}, "$scrollDirection", scrollDirection) === "down"
  })}><div class="header-inner svelte-1w0cm6h"><div class="left svelte-1w0cm6h">`;
  NavbarMobile($$payload);
  $$payload.out += `<!----> `;
  if (hasError || isHome) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="logo-container svelte-1w0cm6h">`;
    Logo($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (themeOptions.docsearch) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class("doc-search svelte-1w0cm6h", void 0, {
      "is-home": isHome,
      "move": !isHome && !hasError
    })}>`;
    Search($$payload, spread_props([themeOptions.docsearch]));
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <nav class="nav-links svelte-1w0cm6h" aria-label="Menu"><div class="navbar-pc svelte-1w0cm6h"><div class="sm:flex none"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let navItem = each_array[$$index];
    NavItem($$payload, spread_props([navItem]));
  }
  $$payload.out += `<!--]--></div> `;
  {
    $$payload.out += "<!--[-->";
    NavItem($$payload, {
      to: themeOptions.github,
      external: true,
      icon: true,
      builtInIcon: true,
      title: "Github",
      children: ($$payload2) => {
        Github($$payload2, {});
      },
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!--]--> `;
  if (themeOptions.discord) {
    $$payload.out += "<!--[-->";
    NavItem($$payload, {
      to: themeOptions.discord,
      external: true,
      icon: true,
      builtInIcon: true,
      title: "Discord",
      children: ($$payload2) => {
        Discord($$payload2, {});
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  ToggleDark($$payload);
  $$payload.out += `<!----></div></nav></div> `;
  if (!isHome) {
    $$payload.out += "<!--[-->";
    MobileSubNav($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></header>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Close($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="m7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884L7.116 8z" clipRule="evenodd"></path></svg>`;
}
function PointLeft($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M0 220.8C0 266.416 37.765 304 83.2 304h35.647a93.148 93.148 0 0 0 7.929 22.064c-2.507 22.006 3.503 44.978 15.985 62.791C143.9 441.342 180.159 480 242.701 480H264c60.063 0 98.512-40 127.2-40h2.679c5.747 4.952 13.536 8 22.12 8h64c17.673 0 32-12.894 32-28.8V188.8c0-15.906-14.327-28.8-32-28.8h-64c-8.584 0-16.373 3.048-22.12 8H391.2c-6.964 0-14.862-6.193-30.183-23.668l-.129-.148l-.131-.146c-8.856-9.937-18.116-20.841-25.851-33.253C316.202 80.537 304.514 32 259.2 32c-56.928 0-92 35.286-92 83.2c0 8.026.814 15.489 2.176 22.4H83.2C38.101 137.6 0 175.701 0 220.8zm48 0c0-18.7 16.775-35.2 35.2-35.2h158.4c0-17.325-26.4-35.2-26.4-70.4c0-26.4 20.625-35.2 44-35.2c8.794 0 20.445 32.712 34.926 56.1c9.074 14.575 19.524 27.225 30.799 39.875c16.109 18.374 33.836 36.633 59.075 39.596v176.752C341.21 396.087 309.491 432 264 432h-21.299c-40.524 0-57.124-22.197-50.601-61.325c-14.612-8.001-24.151-33.979-12.925-53.625c-19.365-18.225-17.787-46.381-4.95-61.05H83.2C64.225 256 48 239.775 48 220.8zM448 360c13.255 0 24 10.745 24 24s-10.745 24-24 24s-24-10.745-24-24s10.745-24 24-24z"></path></svg>`;
}
function SidebarGroup_1($$payload, $$props) {
  push();
  var $$store_subs;
  const routeId = store_get($$store_subs ??= {}, "$page", page).route.id;
  const {
    items = [],
    title = "",
    collapsible = false,
    nested = false
  } = $$props;
  let collapsed = false;
  $$payload.out += `<div${attr_class("sidebar-group svelte-1csr6ga", void 0, { "nested": nested })}><div${attr_class("group-title svelte-1csr6ga", void 0, { "with-mb": !nested })}><div>${escape_html(title)}</div> `;
  if (collapsible) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="collapse-control svelte-1csr6ga" role="button" tabindex="0" aria-label="Collapsable button"><div${attr_class("arrow svelte-1csr6ga", void 0, { "collapsed": collapsed })}>`;
    ArrowDown($$payload);
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(items);
    $$payload.out += `<div class="links svelte-1csr6ga"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      const active = routeId.endsWith("/") ? item.to === routeId : item.to === `${routeId}/`;
      if (Array.isArray(item.items) && item.items.length) {
        $$payload.out += "<!--[-->";
        SidebarGroup_1($$payload, spread_props([item, { nested: true }]));
      } else {
        $$payload.out += "<!--[!-->";
        Link($$payload, {
          to: item.to,
          active,
          label: item.title,
          inline: false,
          highlight: false,
          children: ($$payload2) => {
            if (active) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<div class="active-icon svelte-1csr6ga">`;
              PointLeft($$payload2);
              $$payload2.out += `<!----></div>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          }
        });
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Sidebar($$payload, $$props) {
  push();
  var $$store_subs;
  const routeId = store_get($$store_subs ??= {}, "$page", page).route.id;
  const isHome = routeId === "/";
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$resolvedSidebar", resolvedSidebar));
  $$payload.out += `<aside${attr_class("theme-default-sidebar svelte-z5zf4y", void 0, {
    "collapsed": store_get($$store_subs ??= {}, "$sidebarCollapsed", sidebarCollapsed),
    "is-home": isHome
  })}><div class="sidebar-logo svelte-z5zf4y">`;
  Logo($$payload);
  $$payload.out += `<!----> <div class="close svelte-z5zf4y" role="button" tabindex="0">`;
  Close($$payload);
  $$payload.out += `<!----></div></div> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let sidebarItem = each_array[$$index];
    const hasItems = Array.isArray(sidebarItem.items);
    SidebarGroup_1($$payload, spread_props([
      hasItems ? sidebarItem : { title: "", items: [sidebarItem] }
    ]));
  }
  $$payload.out += `<!--]--></aside> `;
  Backdrop($$payload, {
    show: !store_get($$store_subs ??= {}, "$sidebarCollapsed", sidebarCollapsed)
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function GlobalLayout($$payload, $$props) {
  push();
  var $$store_subs;
  const { children, $$slots, $$events, ...rest } = $$props;
  setContext(SVELTEPRESS_CONTEXT_KEY, { isDark });
  resolveSidebar(store_get($$store_subs ??= {}, "$page", page).route.id);
  if (store_get($$store_subs ??= {}, "$showHeader", showHeader)) {
    $$payload.out += "<!--[-->";
    Navbar($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$page", page).error) {
    $$payload.out += "<!--[-->";
    Error($$payload, {
      error: store_get($$store_subs ??= {}, "$page", page).error
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<main${attr_class("svelte-1y933zt", void 0, {
      "without-header": store_get($$store_subs ??= {}, "$showHeader", showHeader) === false
    })}>`;
    AjaxBar($$payload, {});
    $$payload.out += `<!----> `;
    if (store_get($$store_subs ??= {}, "$sidebar", sidebar)) {
      $$payload.out += "<!--[-->";
      Sidebar($$payload);
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    Backdrop($$payload, {
      show: !store_get($$store_subs ??= {}, "$navCollapsed", navCollapsed),
      top: "56px",
      zIndex: 887
    });
    $$payload.out += `<!----> `;
    children?.($$payload);
    $$payload.out += `<!----> `;
    Toc($$payload, {
      anchors: store_get($$store_subs ??= {}, "$anchors", anchors)
    });
    $$payload.out += `<!----> `;
    GoogleAnalytics($$payload);
    $$payload.out += `<!----> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></main>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _layout($$payload, $$props) {
  const fm = {};
  const { children } = $$props;
  GlobalLayout($$payload, {
    fm,
    children: ($$payload2) => {
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
}
export {
  _layout as default
};
