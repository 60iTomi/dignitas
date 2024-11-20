let method = 'code128';
let auth = '12345';
let id = 'notFound';
const name = 'Test';

const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        id = urlParams.get('id');
    }
    console.log('Identifier:', id);


document.addEventListener('DOMContentLoaded', (event) => {
    

    if (method == 'text') {
        document.getElementById("codeText").classList.add("textOnly");
        document.getElementById("barcode").style.display = "none";
        console.log("Entry is text only");
    } else {
        JsBarcode("#barcode", auth, {
            format: method,
            lineColor: "black",
            height:80,
            width:100,
            displayValue: false
        });
        document.getElementById("codeText").classList.add("withCode");
        console.log("Entry is with barcode");
    }
    document.getElementById("codeText").innerHTML = auth;
    document.getElementById("establishmentName").innerHTML = name;
    document.getElementById("reference").innerHTML = id.concat('-', auth, ' ', method);
    
});



link = new URLSearchParams({
    id: id,
    auth: auth,
    method: method
}).toString();
fullLink = `/report?${link}`;
console.log(fullLink);

document.getElementById("report").addEventListener("click", function() {
    window.location.href = fullLink;
});
