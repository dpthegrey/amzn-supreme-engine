const got = require("got");
const HTMLParser = require("node-html-parser");
const prompt = require("prompt-sync")();

// const productLink = "https://www.amazon.in/dp/B073Q5R6VR";

async function Monitor(productLink) {
  var myheaders = {
    connection: "keep-alive",
    "sec-ch-ua": `" Not;A Brand";v="99", "Google Chrome":v="91", "Chromium";v="91"`,
    "sec-ch-ua-mobile": "?0",
    "upgrade-insecure-requests": 1,
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
    "sec-fetch-dest": "document",
    "accept-encoding": "gzip, diflate, br",
    "accept-language": "en-US,en;q=0.9",
    rtt: 50,
    ect: "4g",
    downlink: 10,
  };

  const response = await got(productLink, {
    headers: myheaders,
  });

  if (response && response.statusCode == 200) {
    let root = HTMLParser.parse(response.body);
    let availabilityDiv = root.querySelector("#availability");
    if (availabilityDiv) {
      let productName = productLink.substring(
        productLink.indexOf("com/") + 4,
        productLink.indexOf("/dp")
      );
      let stockText = availabilityDiv.childNodes[1].innerText.toLowerCase();
      if (stockText == "out of stock") {
        console.log("OUT OF STOCK");
      } else {
        console.log("IN STOCK");
      }
    }
  }

  await new Promise((r) => setTimeout(r, 8000));
  Monitor(productLink);
  return false;
}

async function Run() {
  let productLink = prompt("Enter link to monitor: ");
  if (productLink.indexOf("http") >= 0) {
    console.log("Now monitoring " + productLink);
  } else {
    console.log("ERROR, Invald URL");
  }

  Monitor(productLink);
}

Run();
