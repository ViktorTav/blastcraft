export const templateCarouselItem = (item)=>{
    return `
        <div class = "swiper-slide">
            <div class = "partner">
                <a href="${item.url}">
                    <img class = "partner-image" alt="Imagem de perfil de:${item.nome}" src="${item.imagem}"/>
                    <div class = "partner-info">
                        <span class = "partner-name">${item.nome}</span>
                    </div>
                </a>
            </div>
        </div>
    `
}