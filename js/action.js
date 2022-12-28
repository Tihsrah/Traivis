const joinBtn = document.querySelector(".join-btn");
const joinInput = document.querySelector(".join-input");
const creteBtns = document.querySelectorAll(".create-btn");

document.querySelector(".focus-btn").onclick = function () {
  joinInput.focus();
};

joinBtn.addEventListener("click", joinMeeting);

creteBtns.forEach((b) => b.addEventListener("click", createMeeting));

function createMeeting() {
  let id = Math.floor(Math.random() * 100000000);
  const path = window.location.origin + "/meeting.html?meetingId=" + id;
  window.location.replace(path);
}

function joinMeeting() {
  const id = joinInput.value;

  if (joinInput.value) {
    const path = window.location.origin + "/meeting.html?meetingId=" + id;
    window.location.replace(path);
  } else {
    alert("Mention the Meeting Id");
  }
}
