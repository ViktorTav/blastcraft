export const templateContact = (contact)=>{
    return `
        <a href = ${contact.link} target="_blank">
            <li class = 'contact'>
                <i class="${contact.faClass}"></i>
            </li>
        </a>
    `
}