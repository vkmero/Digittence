const texts = ["Smart", "Secure", "Seamless"];
let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function typeEffect() {
    const element = document.querySelector(".typing");
    if (!element) return;

    if (!isDeleting && j <= texts[i].length) {
        current = texts[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
        current = texts[i].substring(0, j--);
    }

    element.textContent = current;

    if (j === texts[i].length) isDeleting = true;
    if (j === 0 && isDeleting) {
        isDeleting = false;
        i = (i + 1) % texts.length;
    }

    setTimeout(typeEffect, 120);
}
typeEffect();
