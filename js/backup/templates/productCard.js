const templateProductCard = (product)=>{
    return `
    
    <li class = "product-card" data-product-id = '${product.id}'>
        <img class = "product-card-image" src='${product.imagem}'/>
        <div class = "product-card-content"> 
            <h1 class = "product-card-title">${product.nome}</h1>
            <ul class = "product-card-advantages">
                ${product.vantagens.map((advantage)=>
                        `<li>${advantage}</li>`)
                    .join('')
                }
            </ul>
            <button class = "product-card-buy">Comprar</button>
            <span class = "product-card-price-container">
                Por apenas
                <span class = "product-card-price">${product.valor}</span>
            </span>
        </div>
    </li>

`
}

export default templateProductCard;