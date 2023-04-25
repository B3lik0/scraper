const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
async function getWebsiteData() {
  try {
    const link = "https://coinmarketcap.com";
    const config = {
      method: "GET",
      url: link,
      maxBodyLength: Infinity,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    };
    const { data } = await axios(config);
    let $ = cheerio.load(data);
    const selector =
      "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr";

    const keys = Array(
      "Rank",
      "Name",
      "Price",
      "UnaH",
      "VeintiCuatroH",
      "SieteD",
      "MarketCap",
      "Volume",
      "CirculatingSupply"
    );

    const cointArr = [];

    $(selector).each((parentID, parentEL) => {
      let keyIndex = 0;
      const coinObj = {};
      if (parentID <= 9) {
        $(parentEL)
          .children()
          .each((childID, childEL) => {
            let value = $(childEL).text();
            if (keyIndex === 1 || keyIndex === 6) {
              value = $("p", $(childEL).html()).text();
            }
            if (value) {
              coinObj[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
        cointArr.push(coinObj);
      }
    });
    return cointArr;
  } catch (err) {
    console.log(err);
  }
}

const app = express();
app.use(cors());
app.get("/cryptos", async (req, res) => {
  try {
    const data = await getWebsiteData();
    res.status(200).json({
      result: data,
    });
  } catch (error) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});

app.listen(3000, () => {
  console.log("server online");
});
