type TagType = keyof HTMLElementTagNameMap;
type ChildrenType = HTMLElement | HTMLElement[];
type OptionTypeWithChildren<T> = {[key in keyof T]?: unknown} & {children?: ChildrenType };
type OptionType<T> = {[key in keyof T]?: unknown};
type ElementType = HTMLElement & { refresh: () => void };
type RenderType = <T>(tag: TagType, options?: OptionTypeWithChildren<T> | OptionType<T>) => ElementType;
type RouteType = Record<string, () => ElementType>;

function route(routes: (callback: ElementType) => RouteType) {
  const element = div();

  function sync() {
    let hashLocation = document.location.hash.split("#")[1];
    if (!hashLocation) {
      hashLocation = "/";
    }

    element.replaceChildren(routes(element)[hashLocation]());
    return element;
  }
  sync();
  window.addEventListener("hashchange", sync);

  return element;
}

function view(children: (callback: ElementType) => ChildrenType) {
  const element: ElementType = div();

  const refresh = () => {
    element.refresh = refresh;
    const childrenElements = children(element);
    if (childrenElements instanceof Array) {
      element.replaceChildren(...childrenElements);
    } else {
      element.replaceChildren(childrenElements);
    }

    return element;
  }

  refresh();
  return element;
}

const render: RenderType = (tag, options) => {
  const element: ElementType = Object.assign(document.createElement(tag), { refresh: () => {} });
  const childrens: HTMLElement[] = [];
  
  if (!options) return element;
  for (let opt of Object.entries(options) ) {
    if (isChildren(opt)) {
      const [, value] = opt;
      if (value instanceof Array) {
	childrens.push(...value);
	value.forEach(el => element.appendChild(el))
      } else {
	childrens.push(value);
	element.appendChild(value);
      }
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

function div(arg?: OptionType<HTMLDivElement>): ElementType
function div(arg?: ChildrenType): ElementType

function div(arg?: OptionType<HTMLDivElement> | ChildrenType) {
  if (arg instanceof HTMLElement || arg instanceof Array) {
    return render("div", { children: arg });
  } else {
    return render("div", arg);
  }
}

const main = (options?: OptionType<HTMLDivElement>) => render("main", options)
const input = (options?: OptionType<HTMLInputElement>) => render("input", options)
const span = (options?: OptionType<HTMLSpanElement>) => render("span", options)
const h1 = (options?: OptionType<HTMLTitleElement>) => render("h1", options)
const h2 = (options?: OptionType<HTMLTitleElement>) => render("h2", options)
const img = (options?: OptionType<HTMLImageElement>) => render("img", options)
const button = (options?: OptionType<HTMLButtonElement>) => render("button", options)
const pre = (options?: OptionType<HTMLPreElement>) => render("pre", options)
const p = (options?: OptionType<HTMLParagraphElement>) => render("p", options)
const a = (options?: OptionType<HTMLLinkElement>) => render("a", options)

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
