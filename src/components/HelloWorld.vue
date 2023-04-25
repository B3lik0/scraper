<template>
  <div class="div container"></div>
</template>

<script>
import axios from "axios";
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
        const link = "http://localhost:3000/cryptos"
        const config = {
          method: "GET",
          url: link,
          maxBodyLength: Infinity,
          // headers: {
          //   "Access-Control-Allow-Headers": "Content-Type",
          //   "Access-Control-Allow-Origin": "*",
          //   "Access-Control-Allow-Methods": "*",
          // },
        };
        const data = await axios(config);
        console.log(data);  
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
