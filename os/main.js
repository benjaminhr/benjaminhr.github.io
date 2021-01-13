function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
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
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const windowEl = document.querySelector(".window");
dragElement(windowEl);

const zoomButton = document.querySelector(".zoombutton");
let firstClick = true;
zoomButton.addEventListener("click", () => {
  if (firstClick) {
    windowEl.style.height = "99vh";
    windowEl.style.width = "99vw";
    windowEl.style.top = "50%";
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

const closeButton = document.querySelector(".closebutton");
closeButton.addEventListener("click", () => {
  windowEl.style.display = "none";
});

const fileicon = document.querySelector(".fileicon");
fileicon.addEventListener("click", (event) => {
  if (event.detail === 2) {
    windowEl.style.display = "block";
  }
});
