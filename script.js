
window.addEventListener('load', (event) => {
    console.log("Loaded!");
    setTimeout(() => {
        act()
    }, 1000);
});

let link = "eapps-link";
let toolbar = "eapps-widget-toolbar";
let popUp = "eapps-instagram-feed-popup eapps-instagram-feed eapps-widget es-popup";

function act() {
    removeElementsByClass(link);
    removeElementsByClass(toolbar);
    modifyBtn();
    checkIfOpened();
}
function removeElementsByClass(className){
    console.log("Element Removed");
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


function modifyBtn() {
let loadMoreBtn = document.getElementsByClassName("eapps-instagram-feed-posts-grid-load-more-text eapps-instagram-feed-posts-grid-load-more-text-visible");
let btnElement = loadMoreBtn[0];
btnElement.textContent = "Покажи още";

}

function pht() {
let photos = document.getElementsByClassName("eapps-instagram-feed-posts-item-text es-post-text")
console.log(photos);
}


const sheetId = '1zvKOjJM7RXN0f7F6JMacFMRboVBcbqL-xltELd2INEI';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'user-data';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
 
const data = []
document.addEventListener('DOMContentLoaded', init)
 
const output = document.querySelector('.output')
 
function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            console.log(rep)
 
            const colz = [];
            const tr = document.createElement('tr');
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                    const th = document.createElement('th');
                    th.innerText = column;
                    tr.appendChild(th);
                }
            })
            output.appendChild(tr);
 
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            processRows(data);
        })
}
  
function processRows(json) {
    json.forEach((row) => {
 
        const tr = document.createElement('tr');
        const keys = Object.keys(row);
     
        keys.forEach((key) => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        })
        output.appendChild(tr);
    })
}


function checkIfOpened() {
    let now = new Date();
    let day = now.getDay();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let timeInMinutes = (hours*60)+minutes;

    let h1Element = document.getElementById('ifOpened');


    console.log(`${hours}:${minutes}`);
    console.log(`${timeInMinutes} minutes science 00:00`);
    console.log(`${day} day of the week`);

    //Check if day is not Sunday
    if(day != 0) {
    //check between 09:00 and 19:30
        if(timeInMinutes >= (9*60)+0 && timeInMinutes <=(19*60)+00) {
            h1Element.textContent = "ОТВОРЕНО";
            h1Element.style.backgroundColor = "green";
        }
        else {
            h1Element.textContent = "ЗАТВОРЕНО";
        }
    }
    else {
        h1Element.textContent = "ЗАТВОРЕНО";
    }
}

