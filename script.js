"use strict";

const elemButton = document.querySelector("#element");
const wrapperElem = document.querySelector(".wrapper");

const dataDayNow = document.createElement("p");
dataDayNow.classList.add("text");

if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "light");
}

let theme = localStorage.getItem("theme");
const getDataDay = localStorage.getItem("last visit");

if (theme === "light") {
  elemButton.textContent = "Turn off";
  wrapperElem.classList.remove("dark");
} else {
  elemButton.textContent = "Turn on";
  wrapperElem.classList.add("dark");
}

if (getDataDay) {
  dataDayNow.textContent = getDataDay;
  elemButton.after(dataDayNow);
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
  const dateNow = new Date();
  const changedDate = dateNow.toLocaleString("uk-UA", data)
  .replace(",", "")
  .replace(".", "-")
  .replace(".", "-");
  
  if (theme === "light") {
    elemButton.textContent = "Turn on";
    dataDayNow.textContent = `Last turn off: ${changedDate}`;
    localStorage.setItem("last visit", `Last turn off: ${changedDate}`);
  } else {
    elemButton.textContent = "Turn off";
    dataDayNow.textContent = `Last turn on: ${changedDate}`;
    localStorage.setItem("last visit", `Last turn on: ${changedDate}`);
  }

  wrapperElem.classList.toggle("dark");

  theme = (theme === "light") ? "dark" : "light";

  if (!dataDayNow.parentNode) {
    elemButton.after(dataDayNow);
  }

  localStorage.setItem("theme", theme);
});

console.log("Last visit:", getDataDay);
console.log("Theme:", theme);