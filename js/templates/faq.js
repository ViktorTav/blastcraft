export const templateFaq = (question)=>{
    return `                
        <li class = "faq-item">
            <span class = "faq-item-title">
                ${question.titulo}

                <div class = "change-state-button">
                    <img class = "change-state-button-1" src="./assets/images/dash.svg">
                    <img class = "change-state-button-2" src="./assets/images/dash.svg">
                </div>
            </span>
            <span class = "faq-item-content">${question.conteudo}</span>
        </li>
    `    
}