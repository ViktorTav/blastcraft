import getJson from "./helpers/getJson.js";
import randomNumber from "./helpers/randomNumber.js";
import templateRandomPurchase from "./templates/randomPurchase.js";
import config from "../config.js";

const products = await getJson("../products.json");
const randomNames = await getJson("../names.json");

const randomPurchaseAnimationDelay = parseInt(
    getComputedStyle(document.documentElement)
        .getPropertyValue("--random-purchase-delay-animation")
        .replace("ms", "")
);

const randomPurchaseCreateDelay = config.compraAleatoria.delay;

const getRandomProduct = () => {
    const categoryNames = Object.keys(products);
    let product = null;

    while (!product) {
        const category =
            categoryNames[Math.ceil(randomNumber(0, categoryNames.length - 1))];

        const index = Math.ceil(randomNumber(0, products[category].length - 1));

        if (products[category][index].disponivel) {
            product = products[category][index];
        }
    }

    return product;
};

let closingEvent = null;

const setClosingEventTimeOut = (time, randomPurchaseElement) => {
    if (closingEvent) return;

    closingEvent = setTimeout(() => {
        closeRandomPurchaseElement(randomPurchaseElement);
    }, time);
};

const stopClosingEventTimeout = () => {
    if (!closingEvent) return;

    clearTimeout(closingEvent);
    closingEvent = null;
};

const closeRandomPurchaseElement = (randomPurchaseElement) => {
    randomPurchaseElement.classList.add("closing");
    setTimeout(() => {
        randomPurchaseElement.remove();
    }, randomPurchaseAnimationDelay);

    setTimeout(
        () => createRandomPurchase(),
        randomNumber(randomPurchaseCreateDelay / 2, randomPurchaseCreateDelay)
    );
};

const createRandomPurchase = () => {
    if ($("div#random-purchase").length || $("span#error").length) return;

    const name =
        randomNames[Math.ceil(randomNumber(0, randomNames.length - 1))];

    const product = getRandomProduct();

    $("body")[0].insertAdjacentHTML(
        "beforeend",
        templateRandomPurchase(name, product)
    );

    const randomPurchaseElement = $("div#random-purchase")[0];
    const buttonClose = $("div#random-purchase button#close")[0];

    const closingTime = config.compraAleatoria.fechamentoAutomatico;

    randomPurchaseElement.addEventListener(
        "mouseenter",
        stopClosingEventTimeout
    );

    randomPurchaseElement.addEventListener("mouseleave", () => {
        setClosingEventTimeOut(closingTime, randomPurchaseElement);
    });

    buttonClose.onclick = () => {
        stopClosingEventTimeout();
        closeRandomPurchaseElement(randomPurchaseElement);
    };

    setClosingEventTimeOut(closingTime, randomPurchaseElement);
};

export {
    stopClosingEventTimeout,
    createRandomPurchase,
    closeRandomPurchaseElement,
    randomPurchaseAnimationDelay,
};
