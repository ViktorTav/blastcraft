import capitalize from "../helpers/capitalize.js";

const templateBuyWindowElement = (product) => {
    const firstPaymentMethod = Object.entries(
        product["metodos_de_pagamento"]
    )[0];

    console.log(firstPaymentMethod)

    return ` 
        <h1>Seu pedido:</h1>
        <div id="product">
            <div id = "product-card">
                <img id = "product-card-image" 
                    alt="${product["nome"]}" 
                    src="${product["imagem"]}"
                />
                <div id ="product-card-content">
                    <span id = "product-name">${product["nome"]}</span>
                    <span>Disponível em estoque</span>
                </div>
            </div>
            <span id = "total">Total: <span id = "product-price">R$${product[
                "valor"
            ].toLocaleString()}</span></span>
        </div>
        <span>Escolha uma forma de pagamento:</span>
        <ul id = "payment-methods">

            ${Object.entries(product["metodos_de_pagamento"])
                .map((paymentMethod, index) => {
                    const paymentMethodName = paymentMethod[0];
                    const paymentMethodUrl = paymentMethod[1];

                    return `
                    <li class="${index === 0 ? "current":  ""}" 
                    data-name = "${capitalize(paymentMethodName)}"
                    data-url = "${paymentMethodUrl}"
                    >
                        <img alt = "${capitalize(
                            paymentMethodName
                        )}" src = "assets/images/${paymentMethodName}.svg">
                    </li>
                `;
                })
                .join("")}
        </ul>
        <a id = "buy-button" href="${firstPaymentMethod[1]}" target="_blank">
            Pagar com
            <span id="current-payment-method">${capitalize(firstPaymentMethod[0])}</span>
        </a>

        <button id = 'buy-window-close'>&#10005</button>
    `;
};

export default templateBuyWindowElement;
