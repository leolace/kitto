if (!root) throw new Error("Root is not present on the DOM");

let count = 0;

const el = () => div({
  children: [
    div({
      children: [
	h1({
	  textContent: "titulo dentro de span dentro de div",
	  style: "font-size: 1rem; color: red;",
	  onclick: () => {
	    count++;
	    el().refresh();
	  },
	}),
	span({ textContent: String(count) }),
	input({ placeholder: "insira um valor", onclick: () => console.log("oi") })
      ],
      style: "",
    }),
    span({ textContent: String(count) }),
  ],
    role: "container",
    style: "padding: 1rem; background-color: #ddd",
})

root.appendChild(el());

