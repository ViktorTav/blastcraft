import getJson from "./helpers/getJson.js";
import config from "../config.js";
import templateProductCard from "./templates/productCard.js";
import templateBuyWindowElement from "./templates/buyWindowElement.js";
import { fadeIn, fadeOut } from "./animations/fade.js";
import {
    closeRandomPurchaseElement,
    randomPurchaseAnimationDelay,
    stopClosingEventTimeout,
} from "./randomPurchase.js";
import delay from "./utils/delay.js";

const buyWindowDelayAnimation = parseInt(
    getComputedStyle(document.documentElement)
        .getPropertyValue("--buy-window-delay-animation")
        .replace("ms","")
)

const backgroundFilter = $("div#background-filter")[0];

const createBuyWindowElement = async (product) => {
    if(!product.disponivel) return;

    const divBuyWindow = $("div#buy-window")[0];

    if(divBuyWindow.classList.contains("active")){
        divBuyWindow.classList.remove("active");
        backgroundFilter.classList.remove("active");
        await delay(buyWindowDelayAnimation);
    }

    divBuyWindow.innerHTML = "";

    divBuyWindow.insertAdjacentHTML(
        "beforeend",
        templateBuyWindowElement(product)
    );

    $("div#buy-window ul#payment-methods li").forEach((paymentMethod)=>{
        paymentMethod.onclick = (event)=>{
            const paymentMethodInfo = event.target.localName!="li" ? event.path[1] : event.target;

            Array.from($("div#buy-window ul#payment-methods li")).every((li)=>{
                if(li.classList.contains("current")){
                    li.classList.remove("current");
                    return false;
                }

                return true;
            })

            paymentMethodInfo.classList.add("current");

            $("div#buy-window a#buy-button")[0].href=paymentMethodInfo.dataset.url;
            $("div#buy-window span#current-payment-method")[0].innerText=paymentMethodInfo.dataset.name;
        }
    })

    $("button#buy-window-close")[0].onclick = async () => {
        backgroundFilter.classList.remove("active");
        divBuyWindow.classList.remove("active");
        backgroundFilter.onclick=undefined;
    };

    backgroundFilter.onclick = $("button#buy-window-close")[0].onclick;

    divBuyWindow.classList.add("active");
    backgroundFilter.classList.add("active");
};

const createErrorElement = async (message) => {
    if ($("span#error").length) {
        $("span#error")[0].remove();
    }

    if ($("div#random-purchase").length) {
        stopClosingEventTimeout();
        closeRandomPurchaseElement($("div#random-purchase")[0]);
        await delay(randomPurchaseAnimationDelay);
    }

    $("body")[0].insertAdjacentHTML(
        "beforeend",
        `<span id = 'error'>
            ${message}
            <button>&#10005</button>
        </span>`
    );

    $("span#error button")[0].onclick = (event) => {
        const spanError = event.target.offsetParent;
        spanError.classList.add("closing");

        setTimeout(() => spanError.remove(), errorDelayAnimation);
    };
};

const openCategory = async (category) => {
    if (category == currentCategory || !products[category]) return;

    currentCategory = category;

    if ($("span#error").length) {
        $("span#error button")[0].click();
    }

    try {
        await fadeOut(ulProductCards, 300);

        ulProductCards.innerHTML = "";

        $(`button.product-category-button`).forEach((button, i) => {
            if (button.classList.contains("active")) {
                button.classList.toggle("active");
            }
        });

        $(
            `button.product-category-button[data-category=${category}]`
        )[0].classList.toggle("active");

        if (!products[category].length)
            return createErrorElement(errors["sem_produtos"]);

        products[category].forEach((product, i) => {
            product.id = i;
            
            ulProductCards.insertAdjacentHTML(
                "beforeend",
                templateProductCard(product)
            );
        });

        $("button.product-card-buy").forEach((element) => {
            element.onclick = (event) => {
                const productId = event.target.offsetParent.dataset.productId;
                createBuyWindowElement(products[currentCategory][productId]);
            };
        });

        await fadeIn(ulProductCards, 300);
    } catch (err) {
        createErrorElement(errors["falha_carregamento_produtos"]);
    }
};

let currentCategory;

const errorDelayAnimation = getComputedStyle(document.documentElement)
    .getPropertyValue("--error-delay-animation")
    .replace("ms", "");
const ulProductCards = $("ul#products-cards")[0];

const products = await getJson("../products.json");
const errors = await getJson("../errors.json");

const categoriaPadrao = config.categoriaPadrao || "contas";

openCategory(categoriaPadrao);

$("button.product-category-button").forEach((button) => {
    button.onclick = (event) => {
        openCategory(event.target.dataset.category);
    };
});
