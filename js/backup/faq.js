import getJson from "./helpers/getJson.js";

const ulFaqList = $("ul#faq-list");

const questions = getJson("../questions.json");

ulFaqList.append(
    questions.map(
        (question, i) =>
            `                
    <li class = "faq-item" data-faq-id = ${i}>
        <span class = "faq-item-title">
            ${i + 1}. ${question.titulo}

            <div class = "change-state-button">
                <img class = "change-state-button-1" src="./assets/images/dash.svg">
                <img class = "change-state-button-2" src="./assets/images/dash.svg">
            </div>
        </span>
        <span class = "faq-item-content">${question.conteudo}</span>
    </li>
    `
    )
);

$("li.faq-item").click((event) => {
    const faqItem = event.currentTarget;
    $(faqItem).toggleClass("active");
});
