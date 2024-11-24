let method = 'code128';
let auth = '12345';
let id = 'notFound';
let name = 'notFound';




async function fetchAndFill() {
    try {
        const response = await fetch('/api/codes');
        const codes = await response.json();
        let currentlyBestCode = '';
        let possibleCodes = [];

        //load codes from API and filter by establishment ID, then choose the best one
        codes.forEach(code => {
            if (code.establishmentID.$id = id) {
                possibleCodes.push(code);
            }
            if (possibleCodes.length !== 1) {
                for (let i = 0; i < possibleCodes.length; i++) {
                    if (currentlyBestCode.successProbability < possibleCodes[i].successProbability) {
                        currentlyBestCode = possibleCodes[i];
                    }
                }
            } else {
                currentlyBestCode = possibleCodes[0];
            }

            console.log(currentlyBestCode);
            auth = currentlyBestCode.auth;
            method = currentlyBestCode.method;
            name = currentlyBestCode.establishmentID.name;

            document.getElementById("codeText").innerHTML = auth;
            document.getElementById("establishmentName").innerHTML = name;
            document.getElementById("reference1").innerHTML = `id | ${currentlyBestCode.$id}-${auth} ${method}`;
            document.getElementById("reference2").innerHTML = `est | ${id}`;
            
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

            let fullink = `https://dignitasReport.glitch.me/report?code=${currentlyBestCode.$id}`;
            console.log(fullink);
            document.getElementById("report").addEventListener("click", function() {
                window.location.href = fullink;
            });
        });
        
    ;
    } catch (error) {
        console.error('Error loading codes:', error);
    }
}

const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        id = urlParams.get('id');
    }
    console.log('Identifier:', id);

fetchAndFill();
