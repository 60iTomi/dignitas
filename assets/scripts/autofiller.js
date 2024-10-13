let id = '';
let hash = '';
let method = '';
let link = '';
let fullLink = '';

const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    method = urlParams.get('method');

    hash = window.location.hash.substring(1);
    console.log('Identifier:', id);
    console.log('Authorisation:', hash);
    console.log('Method of authorisation:', method);

document.addEventListener('DOMContentLoaded', (event) => {
    

    document.getElementById("data").innerHTML = id.concat('-', hash, ' ', method);

    if (method == 'text') {
        document.getElementById("codeText").classList.add("textOnly");
        document.getElementById("barcode").style.display = "none";
    } else {
        JsBarcode("#barcode", hash, {
            format: method,
            lineColor: "black",
            height:80,
            width:100,
            displayValue: false
        });
        document.getElementById("codeText").classList.add("withCode");
    }
    document.getElementById("codeText").innerHTML = hash;
    
});
link = new URLSearchParams({
    id: id,
    auth: hash,
    method: method
}).toString();
fullLink = `/report?${link}`;
console.log(fullLink);

document.getElementById("report").addEventListener("click", function() {
    window.location.href = fullLink;
});
