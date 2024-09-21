document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const method = urlParams.get('method');

    const hash = window.location.hash.substring(1);
    console.log('Identifier:', id);
    console.log('Authorisation:', hash);
    console.log('Method of authorisation:', method);

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
    const link = new URLSearchParams({
        id: id,
        auth: hash,
        method: method
    }).toString();
    const fullLink = `?${link}`;
    console.log(fullLink);
    console.log(link)
});

