import { fadeIn, fadeOut } from "./animations/fade.js";
import getJson from "./helpers/getJson.js";
import {templateCarouselItem } from "./templates/carouselItem.js";

const carouselWrapper = $("div#carousel .swiper-wrapper")[0];
const partners = await getJson("../partners.json");

export const createCarouselItems = async()=>{

    if(!carouselWrapper) return;

    await fadeOut(carouselWrapper,500);
    carouselWrapper.insertAdjacentHTML("beforeend", partners.map((partner)=>templateCarouselItem(partner)).join(""));
    await fadeIn(carouselWrapper,500);
}

export const createCarousel = async()=>{

    await createCarouselItems();

    new Swiper('.swiper', {
        centerInsufficientSlides:true,
        

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints:{
            1000:{
                slidesPerView: 4,
                slidesPerGroup: 4
            },
            750:{
                slidesPerView: 3,
                slidesPerGroup: 3
            },
            500:{
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            250:{
                slidesPerView: 1,
                slidesPerGroup: 1
            }
        }
    });

    console.log("Carousel created!");
}

createCarousel();