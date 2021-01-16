setTimeout(() => {
  const welcomeScreen = document.querySelector(".welcomescreen");
  const computer = document.querySelector(".computer");

  welcomeScreen.style.display = "none";
  computer.style.display = "block";
}, 5000);

function dragElement(elmntA, elmntB) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmntA.id + "header")) {
    document.getElementById(elmntA.id + "header").onmousedown = dragMouseDown;
  } else {
    elmntA.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmntB.style.top = elmntB.offsetTop - pos2 + "px";
    elmntB.style.left = elmntB.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const titleBarEl = document.querySelectorAll(".titlebar");
const windowEl = document.querySelectorAll(".window");
const zoomButton = document.querySelectorAll(".zoombutton");
const closeButton = document.querySelectorAll(".closebutton");

for (let i = 0; i < titleBarEl.length; i++) {
  dragElement(titleBarEl[i], windowEl[i]);
  addZoomClick(zoomButton[i], windowEl[i]);
  addCloseButtonClick(closeButton[i], windowEl[i]);
  addZindexClick(windowEl[i], windowEl);
}

function addZindexClick(windowElement, allWindowElements) {
  windowElement.addEventListener("click", (e) => {
    const changeSiblingZindexes = (el) => {
      const children = el.parentNode.children;

      for (let i = 0; i < children.length; i++) {
        const currentChild = children[i];

        if (currentChild.classList.contains("window") && currentChild != el) {
          console.log("changing zindex" + i);
          currentChild.style.zIndex = "9";
        }
      }
    };

    changeSiblingZindexes(windowElement);
    windowElement.style.zIndex = "10";
  });
}

function addZoomClick(zoomButton, windowEl) {
  let firstClick = true;
  zoomButton.addEventListener("click", () => {
    windowEl.style.zIndex = "999999";
    if (firstClick) {
      windowEl.style.height = "95vh";
      windowEl.style.width = "99vw";
      windowEl.style.top = "48%";
      windowEl.style.left = "50%";
      windowEl.style.transform = "translate(-50%, -50%)";
      firstClick = false;
    } else {
      windowEl.style.height = "50vh";
      windowEl.style.width = "50vw";
      windowEl.style.top = "45%";
      windowEl.style.left = "50%";
      windowEl.style.transform = "translate(-50%, -45%)";
      firstClick = true;
    }
  });
}

function addCloseButtonClick(closeButton, windowEl) {
  closeButton.addEventListener("click", () => {
    windowEl.style.display = "none";
  });
}

const fileicon = document.querySelector(".fileicon");
fileicon.addEventListener("click", (event) => {
  if (event.detail === 2) {
    windowEl[0].style.display = "block";
  }
});
