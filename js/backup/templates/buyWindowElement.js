import capitalize from "../helpers/capitalize.js";

const templateBuyWindowElement = (product)=>{

    return `
        
        <div id = "buy-window">
            <div id = "buy-window-content">

                <ul id = "buy-window-payments-methods">

                    ${Object.entries(product["metodos_de_pagamento"]).map((paymentMethod)=>{

                        const paymentMethodName = paymentMethod[0];
                        const paymentMethodUrl = paymentMethod[1];

                        return(`
                            <li class = "payment-method ${paymentMethodName}">
                                <a href="${paymentMethodUrl}" target="_blank">
                                    <img src = "assets/images/${paymentMethodName}.svg">
                                    ${capitalize(paymentMethodName)}
                                </a>
                            </li>
                        `)
                    }).join('')}
                </ul>
            </div>

            <button id = 'buy-window-close'>&#10005</button>

        </div>`
}

export default templateBuyWindowElement;