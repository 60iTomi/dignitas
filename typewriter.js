const texts = ["Nyilvános mosdók, egyszerűen.", "A higiénia alapvető emberi jog.", "Méltósággal, közösen."];
let currentTextIndex = 0;
let charIndex = 0;
const typeSpeed = 100;
const eraseSpeed = 40;
const delayBetweenTexts = 5000; // Delay after each text before starting to erase

function type() {
    const currentText = texts[currentTextIndex];
    document.getElementById('typewriter').textContent = currentText.substring(0, charIndex);

    if (charIndex < currentText.length) {
        charIndex++;
        blinker();  // Start the blinking cursor
        setTimeout(type, typeSpeed);
    } else {
        setTimeout(() => {
            erase();
        }, delayBetweenTexts);
    }
}

function blinker() {
    const cursor = document.getElementById('typewriter');
    cursor.classList.toggle('nocursor');
    setTimeout(blinker, 500);
}

function erase() {
    const currentText = texts[currentTextIndex];
    document.getElementById('typewriter').textContent = currentText.substring(0, charIndex);

    if (charIndex > 0) {
        charIndex--;
        setTimeout(erase, eraseSpeed);
    } else {
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(type, typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, typeSpeed);
    blinker();  // Start the blinking cursor immediately
});
