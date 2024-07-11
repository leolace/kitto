type TagType = keyof HTMLElementTagNameMap;
type ChildrenType = HTMLElement | HTMLElement[];
type OptionTypeWithChildren<T> = {[key in keyof T]?: unknown} & {children?: ChildrenType };
type OptionType<T> = {[key in keyof T]?: unknown};
type RenderType = <T>(tag: TagType, options?: OptionTypeWithChildren<T> | OptionType<T>) => HTMLElement & { refresh: () => void };

const view = (children: (callback: HTMLElement & { refresh: () => void }) => ChildrenType) => {
  const element: HTMLElement & { refresh: () => void } = div();

  const sync = () => {
    element.refresh = sync;
    const childrenElements = children(element);
    if (childrenElements instanceof Array) {
      element.replaceChildren(...childrenElements);
    } else {
      element.replaceChildren(childrenElements);
    }

    return element;
  }

  sync();
  return element;
}

const render: RenderType = (tag, options) => {
  const element: HTMLElement & { refresh: () => void } = Object.assign(document.createElement(tag), { refresh: () => {} });
  const childrens: HTMLElement[] = [];
  
  if (!options) return element;
  for (let opt of Object.entries(options) ) {
    if (isChildren(opt)) {
      const [, value] = opt;
      if (value instanceof Array){
	childrens.push(...value);
	value.forEach(el => element.appendChild(el))
      } else {
	childrens.push(value);
	element.appendChild(value);
      }
      continue;
    }

    if (isHTMLAttribute<HTMLElementTagNameMap[typeof tag]>(tag, opt)) {
      const [key, value] = opt;

      if (key === "textContent") {
	element[key] = value;
      } else if (isHTMLEventName(key) && typeof value === "function") {
	element[key] = value;
      } else {
	element.setAttribute(key, value);
      }
    }
  }

  element.refresh = () => element.replaceChildren(...childrens);
  return element;
}

const div = (options?: OptionType<HTMLDivElement>) => render("div", options)
const main = (options?: OptionType<HTMLDivElement>) => render("main", options)
const input = (options?: OptionType<HTMLInputElement>) => render("input", options)
const span = (options?: OptionType<HTMLSpanElement>) => render("span", options)
const h1 = (options?: OptionType<HTMLTitleElement>) => render("h1", options)
const h2 = (options?: OptionType<HTMLTitleElement>) => render("h2", options)
const img = (options?: OptionType<HTMLImageElement>) => render("img", options)

const isChildren = (target: [string, unknown]): target is [string, ChildrenType] => {
  const [key, value] = target;

  if (key && value && key === "children" && typeof value === "object") return true;
  else return false;
}

const isHTMLAttribute = <T>(tag: string, target: [unknown, unknown]): target is [keyof T, string] => {
  const [key, value] = target;

  if (typeof key === "string" && key in document.createElement(tag)) return true;
  else return false;
}

const isHTMLEventName = (value: string): value is keyof HTMLElementEventMap => {
    const eventNames: Set<string> = new Set([
    "onabort", "onanimationcancel", "onanimationend", "onanimationiteration", "onauxclick", "onblur", "oncancel",
    "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick",
    "ondrag", "ondragend", "ondragenter", "ondragexit", "ondragleave", "ondragover", "ondragstart", "ondrop",
    "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "ongotpointercapture",
    "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata",
    "onloadstart", "onlostpointercapture", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout",
    "onmouseover", "onmouseup", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize",
    "onscroll", "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onslotchange", "onstalled",
    "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "ontransitioncancel", "ontransitionend", "ontransitionrun",
    "ontransitionstart", "onvolumechange", "onwaiting", "onwebkitanimationend", "onwebkitanimationiteration",
    "onwebkitanimationstart", "onwebkittransitionend", "onwheel", "onpointerdown", "onpointermove", "onpointerup",
    "onpointercancel", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "ongotpointercapture",
    "onlostpointercapture", "onselectstart", "onselectionchange", "onsearch"
    ]);
  
  return eventNames.has(value);
}
