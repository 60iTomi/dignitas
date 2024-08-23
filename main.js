document.getElementById("menuOpen").addEventListener("click", function() {
    document.getElementById("menu").classList.add("menuOpened");
});

document.getElementById("menuExit").addEventListener("click", function() {
    document.getElementById("menu").classList.remove("menuOpened");
});