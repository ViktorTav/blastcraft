import getJson from './helpers/getJson.js';
import { templateFaq } from './templates/faq.js';

const ulFaqList = $("ul#faq-list")[0];
const questions = await getJson("../questions.json");

ulFaqList
    .insertAdjacentHTML("beforeend",questions
        .map((question)=>templateFaq(question))
        .join("")
    )

$("li.faq-item").forEach((element)=>{
    element.onclick = (event)=>{
        const faqItem = event.currentTarget;
        faqItem.classList.toggle('active');
    }
})

console.log("Faq created!");