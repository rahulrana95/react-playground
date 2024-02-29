function eventDelgation() {
  document.addEventListener("EventDelegation", () => {
    function Store() {
      this.boxes = [];
      this.idsMap = {};

      this.getId = () => {
        while (true) {
          const id = Math.random() * 1000000;
          if (!this.idsMap[id]) {
            this.idsMap[id] = id;
            return id;
          }
        }
      };
    }

    const store = new Store();

    const wrapper = document.getElementById("v_content-area");
    wrapper.innerHTML = "";
    wrapper.style.width = "100%";
    wrapper.style.padding = "16px";
    wrapper.style.height = "100vh";

    // add a div

    const parent = document.createElement("div");
    parent.dataset.boxesList = "boxesList";
    wrapper.appendChild(parent);

    parent.addEventListener("click", (e) => {
      let parent = e.target;
      while (parent && parent.dataset.boxid === undefined) {
        parent = parent.parentNode;
      }

      console.log(e.target.innerText);
      console.log(parent.dataset.boxid);
      console.log(parent.contains(parent));
    });

    // add some boxes

    parent.appendChild(createABox());
    parent.appendChild(createABox());
    parent.appendChild(createABox());

    const buttonEl = document.createElement("button");
    buttonEl.addEventListener("click", () => {
      parent.appendChild(createABox());
    });
    buttonEl.innerText = "add box";
    wrapper.appendChild(buttonEl);

    function createABox() {
      const obj = {
        id: store.getId(),
      };
      store.boxes.push(obj);

      const node = document.createElement("div");
      node.innerHTML = `
        <h3>Box ${obj.id}</h3>
        <button class="btn">Button 1</button>
        <button class="btn">Button 2</button>
        `;

      node.dataset.boxid = store.boxes.length;

      return node;
    }
  });
}

eventDelgation();

export default eventDelgation;
