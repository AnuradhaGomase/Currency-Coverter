const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const output = document.querySelector(".output");
const reverse = document.querySelector(".dropdown i");

for(let select of dropdown){
    for (currCode in countryList){
        let opt = document.createElement("option");
        opt.value = currCode;
        opt.innerText = currCode;
        if((select.name === "from" && currCode === "USD") || (select.name === "to" && currCode === "INR")) {
            opt.selected = "selected";
        }
        select.append(opt);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
    
}

const updateFlag = (element) => {
    let currCode = element.value;
    let currID = countryList[currCode];
    let newURL = `https://flagsapi.com/${currID}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newURL;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".change input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data[toCurr.value.toLowerCase()];
    let finalAmt = amtVal * exchangeRate;
    msg.innerText = `1${fromCurr.value} = ${exchangeRate} ${toCurr.value}`;
    output.innerText = finalAmt;
}



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

reverse.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    updateFlag(fromCurr);
    toCurr.value = temp;
    updateFlag(toCurr);
    updateExchangeRate();
})
  
