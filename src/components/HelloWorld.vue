<template>
  <div class="div container"></div>
</template>

<script>
import axios from "axios";
import * as cheerio from "cheerio";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    this.getWebsiteData();
  },
  methods: {
    async getWebsiteData() {
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
        const data = await axios(config);
        console.log(data);
        let $ = cheerio.load(data);
        const selector =
          "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr";

        console.log(selector);

        $(selector).each((parentID, parentEL) => {
          console.log(parentID);
          console.log(parentEL);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
