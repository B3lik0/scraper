<template>
  <div class="div container">
    <ag-grid-vue
      style="width: auto; height: 500px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      animateRows="true"
      :defaultColDef="defaultColDef"
      
    >
    </ag-grid-vue>
  </div>
</template>

<script>
//https://www.ag-grid.com/vue-data-grid/getting-started/
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import axios from "axios";
export default {
  name: "HelloWorld",
  components: {
    AgGridVue,
  },
  props: {
    msg: String,
  },
  data: () => {
    return {
      data: null,
      columnDefs: null,
      rowData: null,
      defaultColDef: {
        resizable: true,
      },
    };
  },
  created() {},
  beforeMount() {
    this.getWebsiteData();
  },
  mounted() {},
  methods: {
    async getWebsiteData() {
      try {
        const link = "http://localhost:3000/cryptos";
        const config = {
          method: "GET",
          url: link,
          maxBodyLength: Infinity,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": "*",
          },
          cors: {
            origin: "http://localhost:3000/cryptos",
          },
        };
        const { data } = await axios(config);
        this.data = data.result;
        this.setHeaderNames();
      } catch (err) {
        console.log(err);
      }
    },
    setHeaderNames() {
      var values = Object.keys(this.data[0]);
      var fieldObj = [];
      var dato = {};
      values.map((value) => {
        dato["field"] = value;
        fieldObj.push({ ...dato });
      });
      this.columnDefs = fieldObj;
      this.rowData = this.data;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
