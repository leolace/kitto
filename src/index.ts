interface NewHTMLElement extends HTMLElement {
  refresh: () => void;
}

type TagType = keyof HTMLElementTagNameMap;
type ChildrenType = HTMLElement | HTMLElement[];
type OptionTypeWithChildren<T> = {[key in keyof T]?: unknown} & {children?: ChildrenType };
type OptionType<T> = {[key in keyof T]?: unknown};
type RenderType = <T>(tag: TagType, options?: OptionTypeWithChildren<T> | OptionType<T>) => HTMLElement & { refresh: () => void };

const root: HTMLElement | null = document.getElementById("root");

if (!root) throw new Error("Root is not present on the DOM");

const render: RenderType = (tag, options) => {
  const element: HTMLElement & { refresh: () => void } = Object.assign(document.createElement(tag), { refresh: () => {} });
  
  if (!options) return element;
  for (let opt of Object.entries(options) ) {
    if (isChildren(opt)) {
      const [, value] = opt;
      value instanceof Array
	? value.forEach(el => element.appendChild(el))
	: element.appendChild(value);
      continue;
    }

    if (isHTMLAttribute<HTMLElementTagNameMap[typeof tag]>(tag, opt)) {
      const [key, value] = opt;

      if (key === "textContent") {
	element[key] = value;
      } else if (key === "onclick" && typeof value === "function") {
	element[key] = value;
      } else {
	element.setAttribute(key, value);
      }
    }
  }

  element.refresh = () => root.replaceChildren(render(tag, options));
  return element;
}

const div = (options: OptionType<HTMLDivElement>) => render("div", options)
const input = (options: OptionType<HTMLInputElement>) => render("input", options)
const span = (options: OptionType<HTMLSpanElement>) => render("span", options)
const h1 = (options: OptionType<HTMLTitleElement>) => render("h1", options)

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

