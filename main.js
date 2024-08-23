document.getElementById("menuOpen").addEventListener("click", function() {
    document.getElementById("menu").classList.add("menuOpened");
    document.getElementById("menu").classList.remove("menuClosed");
});

document.getElementById("menuExit").addEventListener("click", function() {
    document.getElementById("menu").classList.remove("menuOpened");
    document.getElementById("menu").classList.add("menuClosed");
});