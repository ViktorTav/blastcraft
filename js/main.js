import config from "../config.js";
import { createRandomPurchase } from "./randomPurchase.js";

const currentYear = new Date().getFullYear();

$("span.current-year").forEach((span) => {
    span.innerText = currentYear;
});

if (config.compraAleatoria) {
    setTimeout(createRandomPurchase, config.compraAleatoria.ativarApos);
}
