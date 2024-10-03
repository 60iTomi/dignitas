sadKaomojis = ["TnT", ";-;", "(◞‸◟；)", "( • ᴖ • ｡)"];
chosenKaomoji = sadKaomojis[Math.floor(Math.random() * sadKaomojis.length)];
console.log(chosenKaomoji);
document.getElementById("kaomoji").innerHTML = chosenKaomoji;