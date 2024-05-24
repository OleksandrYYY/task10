"use strict";

const elemButton = document.querySelector("#element");
const wrap = document.querySelector(".wrapper");

const newElem = document.createElement("p");
newElem.classList.add("text");
newElem.style.color = "#00FF00";

if (localStorage.getItem("light") === null) {
  localStorage.setItem("light", "true");
}

let light = localStorage.getItem("light") === "true";
const getInfo = localStorage.getItem("info");

if (light) {
  elemButton.textContent = "Turn off";
  wrap.style.backgroundColor = "#E6E6FA";
} else {
  elemButton.textContent = "Turn on";
  wrap.style.backgroundColor = "#000000";
}

if (getInfo) {
  newElem.textContent = getInfo;
  elemButton.after(newElem);
}

const data = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  millisecond: "2-digit",
};

elemButton.addEventListener("click", function () {
  const nowDate = new Date();
  const changedDate = nowDate
    .toLocaleString("uk-UA", data)
    .replace(",", "")
    .replace(".", "-")
    .replace(".", "-");
  if (light) {
    elemButton.textContent = "Turn on";
    wrap.style.backgroundColor = "#000000";
    newElem.textContent = `Last turn off: ${changedDate}`;
    localStorage.setItem("info", `Last turn off: ${changedDate}`);
  } else {
    elemButton.textContent = "Turn off";
    wrap.style.backgroundColor = "#E6E6FA";
    newElem.textContent = `Last turn on: ${changedDate}`;
    localStorage.setItem("info", `Last turn on: ${changedDate}`);
  }

  light = !light;
  if (!newElem.parentNode) {
    elemButton.after(newElem);
  }

  localStorage.setItem("light", light);
});

console.log("Info:", getInfo);
console.log("Status:", light);
