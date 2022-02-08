import { fadeIn, fadeOut } from "./animations/fade.js";
import templateTermsAndConditions from "./templates/termsAndConditions.js";

const createTermsAndConditions = async (event) => {
    event.preventDefault();

    if ($("div#terms-and-conditions-window").length) return;

    $("body")[0].insertAdjacentHTML("beforeend", templateTermsAndConditions());

    const divTermsAndConditions = $("div#terms-and-conditions-window")[0];

    divTermsAndConditions.style.display = "none";

    fadeIn(divTermsAndConditions, 500);

    $("button#terms-and-conditions-window-close")[0].onclick = async () => {
        await fadeOut(divTermsAndConditions, 500);
        divTermsAndConditions.remove();
    };
};

$("a.terms-and-conditions").forEach((a) => {
    a.onclick = createTermsAndConditions;
});
