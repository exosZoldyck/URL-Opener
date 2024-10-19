const textbox = document.getElementById('textbox');
const checkboxReverseOrder = document.getElementById('checkbox-reverse-order');

function readTextbox(){
    if (textbox == undefined) return undefined;

    if (textbox.value == "" || textbox.value == undefined) return undefined;

    return textbox.value;
}

function openURLs(text){
    if (text == undefined || text == "") return;

    let urls = text.split(/\r?\n/);
    if (checkboxReverseOrder.checked) urls = urls.reverse();

    for (i in urls){
        const urlText = encodeURI(urls[i]);

        if (!isValidUrl(urlText)) return;

        window.open(urlText, '_blank');
    }
}

function isValidUrl(urlString) {
    let url;

    try { 
        url =new URL(urlString); 
    }
    catch(e){ 
        return false; 
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

function updateTabsCounter(){
    const rowCounter = document.getElementById('row-counter');
    if (rowCounter == undefined) return;

    const text = readTextbox();
    if (text == undefined || text == "") return;

    let urls = text.split(/\r?\n/);

    let urlCounter = 0;
    for (i in urls){
        const urlText = encodeURI(urls[i]);

        if (isValidUrl(urlText)) urlCounter++;
    }

    rowCounter.innerHTML = (urlCounter != 1) ? `${urlCounter} tabs will be be opened` : `${urlCounter} tab will be be opened`;
};

textbox.addEventListener('change', function(){
    updateTabsCounter();
});
document.addEventListener('keyup', e => {
    updateTabsCounter();
});