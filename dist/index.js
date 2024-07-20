"use strict";
function route(routes) {
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
function view(children) {
    const element = div();
    const refresh = () => {
        element.refresh = refresh;
        const childrenElements = children(element);
        if (childrenElements instanceof Array) {
            element.replaceChildren(...childrenElements);
        }
        else {
            element.replaceChildren(childrenElements);
        }
        return element;
    };
    refresh();
    return element;
}
const render = (tag, options) => {
    const element = Object.assign(document.createElement(tag), { refresh: () => { } });
    const childrens = [];
    if (!options)
        return element;
    for (let opt of Object.entries(options)) {
        if (isChildren(opt)) {
            const [, value] = opt;
            if (value instanceof Array) {
                childrens.push(...value);
                value.forEach(el => element.appendChild(el));
            }
            else {
                childrens.push(value);
                element.appendChild(value);
            }
        }
        if (isHTMLAttribute(tag, opt)) {
            const [key, value] = opt;
            if (key === "textContent") {
                element[key] = value;
            }
            else if (isHTMLEventName(key) && typeof value === "function") {
                element[key] = value;
            }
            else {
                element.setAttribute(key, value);
            }
        }
    }
    element.refresh = () => element.replaceChildren(...childrens);
    return element;
};
function div(arg) {
    if (arg instanceof HTMLElement || arg instanceof Array) {
        return render("div", { children: arg });
    }
    else {
        return render("div", arg);
    }
}
const main = (options) => render("main", options);
const input = (options) => render("input", options);
const span = (options) => render("span", options);
const h1 = (options) => render("h1", options);
const h2 = (options) => render("h2", options);
const img = (options) => render("img", options);
const button = (options) => render("button", options);
const pre = (options) => render("pre", options);
const p = (options) => render("p", options);
const a = (options) => render("a", options);
const isChildren = (target) => {
    const [key, value] = target;
    if (key && value && key === "children" && typeof value === "object")
        return true;
    else
        return false;
};
const isHTMLAttribute = (tag, target) => {
    const [key, value] = target;
    if (typeof key === "string" && key in document.createElement(tag))
        return true;
    else
        return false;
};
const isHTMLEventName = (value) => {
    const eventNames = new Set([
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
};
