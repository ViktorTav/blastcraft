const templateProductCard = (product) => {
    return `
    
    <li 
        class = "product-card ${product.rowLastChild ? "row-last-child" : ""}" 
        data-product-id = '${product.id}'
    >
        <img 
            class = "product-card-image ${product["imagem_fora_do_card"] ? "outside" : ""}" 
            src='${product.imagem}'
        />
        <div class = "product-card-content"> 
            <h1 class = "product-card-title">${product.nome}</h1>
            <span class = "product-card-price-container">
                <span class = "product-card-price">${product.valor}</span>
            </span>
            <hr/>
            <ul class = "product-card-advantages">
                ${product.vantagens
                    .map((advantage) => `<li>${advantage}</li>`)
                    .join("")}
            </ul>
            <hr/>
            <span>Entrega do produto de <strong>15</strong> à <strong>60</strong> minutos</span>
            <button 
                class = "product-card-buy ${!product.disponivel ? "non-available" : ""}"
            >
                ${product.disponivel ? "Comprar" : "Não disponível"}
            </button>
        </div>
    </li>

`;
};

export default templateProductCard;
