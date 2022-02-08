import getJson from "./helpers/getJson.js";

const ulContactList = $("ul#contact-list");
const contacts = getJson('../contacts.json');

ulContactList.append(contacts.map((contact,i)=>
    `<a href = ${contact.link} target="_blank">
        <li class = 'contact' data-contact-id = '${i}'>
            <i class="${contact.faClass}"></i>
        </li>
    </a>`
).join(''))

