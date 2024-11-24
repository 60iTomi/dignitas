document.getElementById("menuOpen").addEventListener("click", function() {
    document.getElementById("menu").classList.remove("menuClosed");
    document.getElementById("menu").classList.add("menuOpened");
    document.getElementById("menuFilter").classList.add("filterOpened");
    document.documentElement.style.setProperty('overflow-y', 'hidden');
});

document.getElementById("menuExit").addEventListener("click", function() {
    document.getElementById("menu").classList.remove("menuOpened");
    document.getElementById("menu").classList.add("menuClosed");
    document.getElementById("menuFilter").classList.remove("filterOpened");
    document.documentElement.style.setProperty('overflow-y', 'auto');
});