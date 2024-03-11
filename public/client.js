const nav = document.querySelector("nav");
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", () => [
    nav.classList.toggle("closed")
])