export {
    get,

}

const get = function(url, fiveday, succes, fail) {
    const htmlRequest = new XMLHttpRequest();
    htmlRequest.open('GET', url);
    htmlRequest.onload = () => {
        if (htmlRequest.status == 200) {
            succes(htmlRequest.responseText)

            const xml2 = new XMLHttpRequest();
            xml2.open('GET', fiveday);
            xml2.onload = function() {
                if (xml2.status == 200) {
                    succes(xml2.responseText)
                } else
                    console.log(xml2.statusText);
                fail(xml2.statusText);
            }
            xml2.send()
        } else
            console.log(htmlRequest.statusText);
        fail(htmlRequest.statusText);
    }
    htmlRequest.send()

}