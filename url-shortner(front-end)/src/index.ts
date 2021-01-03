import { UrlDetails } from './interfaces/url-details.interface';
import { ResponseJson } from './interfaces/response-json.interface';
let apiUrl: string = 'https://url-shortner-app-123.herokuapp.com';

// fetch all url details to display in table
let fetchAllUrlDetails = async () => {
    try {
        let urlDetails = await fetch(`${apiUrl}/url-data`);
        let urlDetailsJson: ResponseJson = await urlDetails.json();
        return urlDetailsJson;
    } catch (err) {
        console.error(err);
    }
}

// display url details in table and show loader till the data is been fetch and the hide loader
let displayUrlDetails = async () => {
    showLoader();
    let urlDetailsJson = await fetchAllUrlDetails();
    hideLoader();
    createDomForUrlDetails(urlDetailsJson);
}

// fetch the redirect url and redirect in a new tab
let redirectToOriginalUrl = async (shortUrl: string) => {
    showLoader();
    let urlDetails = await fetchRedirectUrl(shortUrl);
    displayUrlDetails();
    window.open(`${urlDetails.data.url}`, '_blank');
    hideLoader();
}

// makes an api call to fetch the redirect url data
let fetchRedirectUrl = async (shortUrl: string) => {
    try {
        let urlData = await fetch(`${apiUrl}/redirect-url/${shortUrl}`);
        let urlDataJson = await urlData.json();
        return urlDataJson;
    } catch (err) {
        console.error(err);
    }
}

//creating table for the url details fetched
let createDomForUrlDetails = (urlDetailsJson) => {
    let urlDetails: Array<UrlDetails> = urlDetailsJson.data;

    let tableContainer = document.createElement('div');
    tableContainer.classList.add('container-table');

    let tableHeaderRow = document.createElement('div');
    tableHeaderRow.classList.add('container-table-header-row');

    let columnHeaders = ['Sr no.', 'Url', 'Short Url', 'Clicks'];
    columnHeaders.forEach(element => {
        let columnData = document.createElement('div');
        columnData.classList.add('column-table-data');
        columnData.innerHTML = element;
        tableHeaderRow.append(columnData);
    })

    tableContainer.append(tableHeaderRow);

    urlDetails.forEach((element: UrlDetails, index: number) => {
        let columnRow = document.createElement('div');
        columnRow.classList.add('column-table-row');

        let columnSerialData = document.createElement('div');
        columnSerialData.classList.add('column-data');
        columnSerialData.innerHTML = `${index + 1}`;

        let columnUrlData = document.createElement('div');
        columnUrlData.classList.add('column-data', 'url-data');
        columnUrlData.innerHTML = `<a href="${element.url}" target="_blank">${element.url}</a>`;

        let columnShortUrlData = document.createElement('div');
        columnShortUrlData.classList.add('column-data', 'short-url');
        columnShortUrlData.innerHTML = `${element.shortUrl}`;
        columnShortUrlData.onclick = () => {
            redirectToOriginalUrl(element.shortUrl);
        }

        let columnUrlClicksData = document.createElement('div');
        columnUrlClicksData.classList.add('column-data');
        columnUrlClicksData.innerHTML = `${element.clicks}`;

        columnRow.append(columnSerialData, columnUrlData, columnShortUrlData, columnUrlClicksData);
        tableContainer.appendChild(columnRow);
    });
    document.getElementById('table-contents').innerHTML = '';
    document.getElementById('table-contents').append(tableContainer);

}

// creating a loader to show till the data is fetched
let createLoader = () => {
    let loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loader-container');
    loaderContainer.id = 'loader-contanier';

    let loader = document.createElement('div');
    loader.classList.add('loader');

    loaderContainer.append(loader);
    document.body.append(loaderContainer)
}

// show the loader
let showLoader = () => {
    document.getElementById('loader-contanier').style.display = 'flex';
}

//hide the loader
let hideLoader = () => {
    document.getElementById('loader-contanier').style.display = 'none';
}

//make an api call to shortern the url
let shortenUrl = async () => {
    try {
        showLoader();
        let url = (<HTMLInputElement>document.getElementById('shrink-text')).value;
        let shortenUrl = await fetch(`${apiUrl}/shorten-url`, {

            // Adding method type 
            method: "POST",

            // Adding body or contents to send 
            body: JSON.stringify({
                url,
            }),

            // Adding headers to the request 
            headers: {
                "Content-type": "application/json"
            }
        });
        let shortenUrlDetails = await shortenUrl.json();
        (<HTMLInputElement>document.getElementById('shrink-text')).value = '';
        displayMsgModal(shortenUrlDetails.message);
        displayUrlDetails();
        hideLoader();
    } catch (err) {

    }
}

// create a modal to display appropriate msg and disappear in 3 secs
let displayMsgModal = (msg: string) => {
    let msgModalContainer = document.createElement('div');
    msgModalContainer.classList.add('msg-modal-container');
    msgModalContainer.id = 'msg-modal-container';

    let msgModalContent = document.createElement('div');
    msgModalContent.classList.add('msg-modal-content');
    msgModalContent.innerHTML = msg;

    let modalCloseBtn = document.createElement('div');
    modalCloseBtn.classList.add('modal-close-btn');
    modalCloseBtn.innerHTML = 'close';

    msgModalContent.append(modalCloseBtn);

    msgModalContainer.append(msgModalContent);
    document.body.append(msgModalContainer);

    modalCloseBtn.onclick = () => {
        msgModalContainer.style.display = 'none';
    }
    setTimeout(() => {
        msgModalContainer.remove();
    }, 3000)
}

// on click of btn call a method to shorten the url
document.getElementById('shortenUrl').addEventListener('click', () => {
    shortenUrl();
})
createLoader();
displayUrlDetails();
