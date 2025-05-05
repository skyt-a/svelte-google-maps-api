import { M as spread_attributes, J as escape_html, D as pop, B as push } from "./index.js";
import { E as External, g as getPathFromBase } from "./Expansion.svelte_svelte_type_style_lang.js";
function Link($$payload, $$props) {
  push();
  const {
    label = "",
    to = "",
    inline = true,
    active = false,
    highlight = true,
    withBase = true,
    pre,
    labelRenderer,
    children
  } = $$props;
  let isExternal = /^https?|mailto:/.test(to);
  let toWithBase = isExternal ? to : getPathFromBase(to);
  $$payload.out += `<a${spread_attributes(
    {
      href: withBase ? toWithBase : to,
      class: "link",
      ...isExternal ? { target: "_blank" } : {},
      "aria-label": label
    },
    "svelte-xp58p1",
    { "no-inline": !inline, active, highlight }
  )}>`;
  pre?.($$payload);
  $$payload.out += `<!----> `;
  if (labelRenderer) {
    $$payload.out += "<!--[-->";
    labelRenderer?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span>${escape_html(label)}</span>`;
  }
  $$payload.out += `<!--]--> `;
  if (isExternal) {
    $$payload.out += "<!--[-->";
    External($$payload, {});
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  children?.($$payload);
  $$payload.out += `<!----></a>`;
  pop();
}
export {
  Link as L
};
