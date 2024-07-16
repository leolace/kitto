"use strict";
// const root: HTMLElement | null = document.getElementById("root");
// if (!root) throw new Error("Root is not present on the DOM");
// let content: string | undefined;
// const btn = (handleClick: () => Promise<void>) => {
//   return button({ textContent: "clicar", onclick: handleClick, style: "padding: 0.25rem 1rem; font-size: 1rem; font-weight: 600" })
// };
// const card = ({ name }: { name: string }) => {
//   let count = 0;
//   const handleClick = async () => {
//     const res = await fetch("https://api.github.com/users/leolace")
//     const json = await res.json();
//     content = json;
//     console.log(json);
//   }
//   return view(({ refresh }) => div({
//     children:
//     [
//       img({
// 	src: "https://i.pinimg.com/736x/99/30/a2/9930a2286fe7a6daa7f39f7de6f38166.jpg",
// 	style: "max-height: 100%; width: 20rem",
// 	onclick: () => {count++; refresh();}
//       }),
//       h2({ textContent: `${name} | ${count}` }),
//       pre({ textContent: `${JSON.stringify(content ?? "", null, 2)}` }),
//       btn(async () => {await handleClick(); refresh()})
//     ],
//     style: "padding: 1rem; background-color: #ddd"
//   })
// )
// }
// const header = div({
//   children: div({
//     children: [
//       h1({
// 	textContent: "Sofis Shop",
// 	style: "font-size: 2rem; color: black; font-weight: 600",
//       }),
//       input({ placeholder: "Procurar...", onblur: () => alert("oi"), style: "padding: 0.25rem 0.5rem; border: 1px solid #ddd; border-radius: 0.25rem; font-size: 1rem;",  })
//     ],
//     style: "display: flex; align-items: center; justify-content: space-between",
//   }),
//   style: "padding: 1rem; background-color: #eee",
// });
// const el = main({
//   children: [
//     header,
//     div({
//       children:
//       [
// 	card({ name: "Prikito azedo" }),
// 	card({ name: "Prikito doce" }),
//       ],
//       style: "display: grid; gap: 1rem;"
//     })
//   ],
//   style: "display: grid; gap: 1rem;"
// })
// root.appendChild(el);
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
const el = main({
    children: [
        header,
        div({
            children: [card({ name: "Produto X", imageSrc: "https://picsum.photos/500" }), card({ name: "Produto Y", imageSrc: "https://picsum.photos/400" })],
            style: "display: grid; gap: 1rem;"
        })
    ],
    style: "display: grid; gap: 1rem;"
});
root.appendChild(el);
