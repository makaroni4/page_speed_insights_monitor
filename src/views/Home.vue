<template>
  <div class="psi-dashboard">
    <div class="psi-dashboard__header">
      <Header />
    </div>

    <div class="psi-dashboard__urls-table">
      <UrlsTable />
    </div>

    <div class="psi-dashboard__footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "@/components/Header.vue";
import UrlsTable from "@/components/UrlsTable.vue";
import Footer from "@/components/Footer.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Header,
    UrlsTable,
    Footer,
  },
});
</script>
