import config from "../config.js"

const month = new Date().getMonth();

window.addEventListener("load", async () => {
    if (month != 11) {
        return;
    }

    const banner = document.querySelector("div.banner");
    const discount = config.natal.desconto;

    const discountLabelTemplate = `<span id = "christmas" class = "discount-label"><i class="fas fa-gift"></i>NATAL - ${discount}% OFF</span>`;
    const bannerText = document.querySelector("div#banner-text");

    banner.insertAdjacentHTML("beforeend", "<div id = 'snow'></div>");

    bannerText.insertAdjacentHTML("afterbegin", discountLabelTemplate);
    particlesJS.load("snow", "../particles.json", () => {
        console.log("Particles.JS loaded with success!");
    });
});
