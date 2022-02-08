const fadeOut = (element, delay) => {
    if (!element.style.opacity) element.style.opacity = 1;

    let opacity = 1;

    return new Promise((resolve) => {
        const fadeEffect = setInterval(() => {
            opacity -= delay / (10 * delay);
            if (opacity > 0) {
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeEffect);
                resolve();
            }
        }, delay / 10);
    });
};

const fadeIn = (element, delay) => {
    element.style.display = "";
    element.style.opacity = 0;

    let opacity = 0;

    return new Promise((resolve) => {
        const fadeEffect = setInterval(() => {
            opacity += delay / (10 * delay);

            if (opacity < 1) {
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeEffect);
                resolve();
            }
        }, delay / 10);
    });
};

export { fadeIn, fadeOut };
