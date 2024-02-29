function vainllaEntry() {
  const leftMenu = document.getElementById("vanilla-left-menu");

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
  width: 100%;
   `;

  leftMenu.appendChild(
    createMenuItem({ name: "event del", eventName: "EventDelegation" })
  );

  leftMenu.appendChild(
    createMenuItem({ name: "Job scheduler", eventName: "JobsScheduler" })
  );

  leftMenu.appendChild(
    createMenuItem({ name: "Custom Promise", eventName: "CustomPromise" })
  );

  leftMenu.appendChild(
    createMenuItem({ name: "SlideShow", eventName: "SlideShow" })
  );

  function createMenuItem({ eventName, name }) {
    const node = document.createElement("div");
    const customEvent = new CustomEvent(eventName);

    node.innerText = name;
    node.style = `
     cursor: pointer;
     padding: 4px;
     margin: 2px;
     
    `;
    // Set inline styles for mouseover and mouseout events
    node.onmouseover = function () {
      // Apply hover styles when mouse enters the element
      node.style.backgroundColor = "lightblue"; // Example hover background color
      // Add more hover styles as needed
    };

    node.onmouseout = function () {
      // Remove hover styles when mouse leaves the element
      node.style.backgroundColor = ""; // Reset background color
      // Remove other hover styles as needed
    };

    node.addEventListener("click", () => {
      document.dispatchEvent(customEvent);
    });
    return node;
  }
}

export default vainllaEntry;
