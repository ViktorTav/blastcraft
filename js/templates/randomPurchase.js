const templateRandomPurchase = (
    buyerName,
    { nome: productName, imagem: productImage }
) => {
    return `
        <div id = "random-purchase">
            <img src="${productImage}" id = "product-image"/>
            <span>
                <span id = "buyer-name">${buyerName}</span>
                acabou de comprar um(a)
                <span id = "product-name">${productName}</span>
            </span>
            <button id = "close">x</button>
        </div>
    `;
};

export default templateRandomPurchase;
