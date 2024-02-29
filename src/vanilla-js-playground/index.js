function vainllaEntry() {
  const leftMenu = document.getElementById("vanilla-left-menu");
  leftMenu.innerHTML = "";

  leftMenu.style = `
    background-color: #c7f1fb;
    padding: 8px;
    height: 100vh;
    width: 110px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    `;

  const vanilla = document.getElementById("vanilla");

  vanilla.style.display = "flex";

  document.getElementById("vanilla").style = `
    display: flex;
`;

  document.getElementById("v_content-area").style = `
       overflow: scroll;
    height: 100vh;

   `;

  leftMenu.appendChild(
    createMenuItem({ name: "event del", eventName: "EventDelegation" })
  );

  leftMenu.appendChild(
    createMenuItem({ name: "Job scheduler", eventName: "JobsScheduler" })
  );

  function createMenuItem({ eventName, name }) {
    const node = document.createElement("div");
    const customEvent = new CustomEvent(eventName);

    node.innerText = name;

    node.addEventListener("click", () => {
      document.dispatchEvent(customEvent);
    });
    return node;
  }
}

export default vainllaEntry;
