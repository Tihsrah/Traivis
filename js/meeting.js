const chatBtns = document.querySelectorAll(".chat-btn");
const showBtns = document.querySelectorAll(".show-btn");
const partsBtns = document.querySelectorAll(".parts-btn");
const chat = document.getElementById("chat");
const parts = document.getElementById("parts");
const drawer = document.querySelector(".info");

window.onload = showParts;

function showParts() {
  parts.classList.remove("d-none");
  chat.classList.add("d-none");
  chat.classList.remove("d-flex");
}

showBtns.forEach((b) =>
  b.addEventListener("click", function () {
    if (drawer.style.right == "-275px") {
      drawer.style.right = 0;
    } else {
      drawer.style.right = "-275px";
    }
  })
);

chatBtns.forEach((b) =>
  b.addEventListener("click", function () {
    parts.classList.add("d-none");
    chat.classList.add("d-flex");
    chat.classList.remove("d-none");
  })
);

partsBtns.forEach((b) => b.addEventListener("click", showParts));