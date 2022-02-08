import getJson from "./helpers/getJson.js";
import { templateContact } from "./templates/contact.js";

const ulContactList = $("ul#contact-list")[0];
const contacts = await getJson('../contacts.json');

ulContactList
    .insertAdjacentHTML("beforeend",contacts.map((contact)=>templateContact(contact)).join(''))

console.log("Contacts created!");

