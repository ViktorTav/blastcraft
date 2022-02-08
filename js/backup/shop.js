import getJson from "./helpers/getJson.js";
import capitalize from "./helpers/capitalize.js";
import templateProductCard from "./templates/productCard.js";
import templateBuyWindowElement from "./templates/buyWindowElement.js";

const createBuyWindowElement = (product)=>{

    if ($("div#buy-window").length){
        $("div#buy-window").remove();
    }

    $('body').append(templateBuyWindowElement(product));

    $('div#buy-window').hide().fadeIn(500);

    $('button#buy-window-close').click((event)=>{   
        $('div#buy-window').fadeOut(500, function(){$(this).remove()})
    })  

}

const createErrorElement = (message)=>{

    if ($("span#error").length){
        $("span#error").remove();
    }

    $('body').append(`
        <span id = 'error'>
            ${message}
            <button>&#10005</button>
        </span>
    `)

    $("span#error button").click((event)=>{
        const spanError = event.target.offsetParent;
        $(spanError).addClass('closing');

        setTimeout(()=>
            $(spanError).remove()
        ,errorDelayAnimation)
    })

}

const openCategory = (category)=>{

    if (category==currentCategory || !products[category]) 
        return;

    currentCategory = category;

    if ($("span#error").length){
        $("span#error button").click();
    }

    try{

        ulProductCards.fadeOut(300, function(){
            $(this).empty();

            $(`button.product-category-button`).each((i,button)=>{
                if (button.classList.contains('active')){
                    $(button).toggleClass('active');
                }
            });

            $(`button.product-category-button[data-category=${category}]`).toggleClass('active');

            if (!products[category].length) return createErrorElement(errors['sem_produtos'])

            let productsAmount = 0;

            products[category].forEach((product, i)=>{

                if (!product.disponivel) return

                product.id = i;
                $(this).append(templateProductCard(product));

                productsAmount++;
            })
    
            if (!productsAmount) return createErrorElement(errors['sem_produtos'])

            $('button.product-card-buy').click((event)=>{
                const productId = event.target.offsetParent.dataset.productId;
                createBuyWindowElement(products[currentCategory][productId]);
            })

            $(this).fadeIn(300);

        })

    }catch(err){
        createErrorElement(errors['falha_carregamento_produtos']);
    }
}

let currentCategory;

const errorDelayAnimation = getComputedStyle(document.documentElement).getPropertyValue('--error-delay-animation').replace('ms','');
const ulProductCards = $("ul#products-cards");

const products = getJson('../products.json');
const config = getJson('../config.json');
const errors = getJson('../errors.json');

openCategory(config["categoria-padrao"]);

$("button.product-category-button").click((event)=>{
    openCategory(event.target.dataset.category);
})



