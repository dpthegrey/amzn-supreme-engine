const got = require("got");

const productLink =
  "https://www.amazon.in/Apple-MacBook-Chip-13-inch-512GB/dp/B08N5WRWNW";

async function Monitor() {
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
  console.log(response.statusCode);
}

Monitor();
