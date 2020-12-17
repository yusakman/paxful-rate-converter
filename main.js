let data;
let amount;
let fee = 0.075 / 100;
let coin;
let result;

let resultSend = document.getElementById("resultSend");
let resultTrade = document.getElementById("resultTrade");
let resultWithdrawl = document.getElementById("resultWithdrawl");
let resultNote = document.getElementById("resultNote");
let cardResult = document.getElementById("card-result");

cardResult.style.display = "none";

function getSellRate() {
  coin = document.getElementById("cryptoList").value;
  amount = document.getElementById("dolar").value;
  console.log(amount);
  getPriceListSell();
}

async function getPriceListSell() {
  let response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ripple,tron,stellar,ethereum,litecoin,dogecoin,eos,bitcoin-cash&vs_currencies=usd"
  );
  data = await response.json();
  console.log("Ripple Price", data.ripple.usd);
  calculateResultSell();
}

// Calculate the logic of the get-sell-rate here
async function calculateResultSell() {
  calculateFeeSell();
  switch (coin) {
    case "ripple":
      // result = amount dolar divide by the current price - fee witdrawl
      result = Number((amount / data.ripple.usd).toFixed(2)) - 0.25;
      resultTrade.innerHTML = `For trade: ${
        result + 0.25 + (result + 0.25) * fee
      }`;
      resultWithdrawl.innerHTML = `For withdraw: ${result + 0.25}`;
      break;
    case "stellar":
      result = Number((amount / data.stellar.usd).toFixed(2)) - 0.01;
      resultTrade.innerHTML = `For trade: ${
        result + 0.01 + (result + 0.01) * fee
      }`;
      resultWithdrawl.innerHTML = `For withdraw: ${result + 0.01}`;
      break;
    case "tron":
      result = Number((amount / data.tron.usd).toFixed(2)) - 1;
      resultTrade.innerHTML = `For trade: ${result + 1 + (result + 1) * fee}`;
      resultWithdrawl.innerHTML = `For withdraw: ${result + 1}`;
      break;
    case "ethereum":
      result = Number((amount / data.ethereum.usd).toFixed(4)) - 0.005;
      resultTrade.innerHTML = `For trade: ${
        result + 0.005 + (result + 0.005) * fee
      }`;
      resultWithdrawl.innerHTML = `For withdraw: ${result + 0.005}`;
      break;
    case "litecoin":
      result = Number((amount / data.litecoin.usd).toFixed(3)) - 0.001;
      resultTrade.innerHTML = `For trade: ${
        result + 0.001 + (result + 0.001) * fee
      }`;
      resultWithdrawl.innerHTML = `For withdraw: ${result + 0.001}`;
      break;
    case "dogecoin":
      result = Number((amount / data.dogecoin.usd).toFixed(2)) - 50;
      resultTrade.innerHTML = `For trade: ${result + 50 + (result + 50) * fee}`;
      resultWithdrawl.innerHTML = `For withdraw: ${result + 50}`;
      break;
    case "eos":
      result = Number((amount / data.eos.usd).toFixed(2)) - 0.1;
      resultTrade.innerHTML = `For trade: ${
        result + 0.1 + (result + 0.1) * fee
      }`;
      resultWithdrawl.innerHTML = `For withdraw: ${result + 0.1}`;
      break;
    case "bitcoin-cash":
      result = Number((amount / data["bitcoin-cash"].usd).toFixed(3)) - 0.001;
      resultTrade.innerHTML = `For trade: ${
        result + 0.001 + (result + 0.001) * fee
      }`;
      resultWithdrawl.innerHTML = `For withdraw: ${result + 0.001}`;
      break;
  }

  if (coin == "ethereum") {
    resultSend.innerHTML = `Hello sir, I will send you ${result.toFixed(
      4
    )} ${coin} (already included 0.005 ETH Binance Withdrawl's Fee, it's kinda high right now $1+), if okay, send me your address, if cancel, let me know, thanks.`;
  } else if (coin == "ripple") {
    resultSend.innerHTML = `Hello sir, I will send you ${result.toFixed(
      2
    )} ${coin}, if okay, send me your address, if cancel, let me know sir, thank you.`;
  } else {
    resultSend.innerHTML = `Hello sir, I will send you ${result.toFixed(
      3
    )} ${coin}, if okay, send me your address, if cancel, let me know sir, thank you.`;
  }

  resultNote.innerHTML = `I've sent it sir. I'll send you the hash once confirmed. No need to release the bitcoin before I send you the hash. Thank you.`;

  cardResult.style.display = "flex";
}

function calculateFeeSell() {
  if (amount <= 20) {
    let feeCut = (amount * 0.53) / 100;
    feeTrade = (amount * 0.075) / 100;
    amount = amount - (feeCut + feeTrade) - 0.1;
  } else {
    let feeCut = (amount * 0.53) / 100;
    feeTrade = (amount * 0.07) / 100;
    amount = amount - (feeCut + feeTrade);
  }
}
