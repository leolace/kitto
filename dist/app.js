"use strict";
const root = document.getElementById("root");
if (!root)
    throw new Error("Root is not present on the DOM");
const card = ({ name, imageSrc }) => {
    let count = 0;
    return view((el) => div({
        children: [
            img({
                src: imageSrc,
                style: "max-height: 100%; width: 20rem",
                onclick: () => { count++; el.refresh(); }
            }),
            h2({ textContent: `${name} | ${count}` }),
            p({ textContent: "Clique na imagem para incrementar", style: "color: #777" })
        ],
        style: "padding: 1rem; background-color: #eee"
    }));
};
const header = div({
    children: div({
        children: [
            h1({
                textContent: "X Store",
                style: "font-size: 2rem; color: black; font-weight: 600",
            }),
            input({ placeholder: "Procurar...", onblur: () => alert("oi"), style: "padding: 0.25rem 0.5rem; border: 1px solid #ddd; border-radius: 0.25rem; font-size: 1rem;", })
        ],
        style: "display: flex; align-items: center; justify-content: space-between",
    }),
    style: "padding: 1rem; background-color: #eee",
});
const counter = () => {
    let count = 0;
    return view(({ refresh }) => div({ textContent: count, onclick: () => { count++; refresh(); } }));
};
const el = main({
    children: [
        header,
        div({
            children: [card({ name: "Produto X", imageSrc: "https://picsum.photos/500" }), card({ name: "Produto Y", imageSrc: "https://picsum.photos/400" })],
            style: "display: grid; gap: 1rem;"
        }),
        counter()
    ],
    style: "display: grid; gap: 1rem;"
});
root.appendChild(el);
