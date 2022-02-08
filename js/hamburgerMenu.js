const buttonHamburgerMenu = $("button#hamburger-menu")[0];
const headerMenu = $("header#menu")[0];

let headerMenuIsActive = false;

buttonHamburgerMenu.onclick = () => {
    headerMenu.classList.toggle("active");
    headerMenuIsActive = true;
};

$("body")[0].onclick = (event) => {
    const elementClicked = event.target;
    if (
        headerMenuIsActive &&
        elementClicked.parentElement.id != "hamburger-menu" &&
        elementClicked.id != "menu"
    ) {
        headerMenu.classList.toggle("active");
        headerMenuIsActive = false;
    }
};
