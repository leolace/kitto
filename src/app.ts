const root: HTMLElement | null = document.getElementById("root");
if (!root) throw new Error("Root is not present on the DOM");

let count = 0;

const card = ({ name }: { name: string }) => {
  let count2 = 0;

  return view((el) => div({
    children:
    [
      view(() => img(
	{
	  src: "https://i.pinimg.com/736x/99/30/a2/9930a2286fe7a6daa7f39f7de6f38166.jpg",
	  style: "max-height: 100%; width: 20rem",
	  onclick: () => {
	    count2++;
	    el.refresh();
	  }
	}
      )),
      h2({ textContent: `${name} | ${count2}` })
    ],
    style: "padding: 1rem; background-color: #ddd"
  })
)
}

const el = () => main({
  children: [
    div({
      children: [
	div({
	  children: [
	    h1({
	      textContent: "Sofis Shop " + count,
	      style: "font-size: 2rem; color: black; font-weight: 600",
	      onclick: () => {
		count++;
		el().refresh();
	      },
	    }),
	    input({ placeholder: "Procurar...", onclick: () => console.log("oi"), style: "padding: 0.25rem 0.5rem; border: 1px solid #ddd; border-radius: 0.25rem; font-size: 1rem;",  })
	  ],
	  style: "display: flex; align-items: center; justify-content: space-between",
	}),
      ],
      role: "container",
      style: "padding: 1rem; background-color: #eee",
    }),
    div({children:
	 [
	   card({ name: "Prikito azedo" }),
	   card({ name: "Prikito doce" }),
	   div({
	     children:
	     [
	       img(
		 {
		   src: "https://i.pinimg.com/736x/99/30/a2/9930a2286fe7a6daa7f39f7de6f38166.jpg",
		   style: "max-height: 100%; width: 20rem"
		 }
	       ),
	       h2({ textContent: "Prikito Cozido" })
	     ],
	     style: "padding: 1rem; background-color: #ddd"
	   }),
	 ],
	 style: "display: grid; gap: 1rem;"
	})
  ],
  style: "display: grid; gap: 1rem;"
})

root.appendChild(el());

