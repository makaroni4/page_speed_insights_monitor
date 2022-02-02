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

<style lang="scss">
.psi-dashboard {
  position: relative;

  &__container {
    padding-bottom: 32px;
  }

  &__urls-table {
    margin-bottom: 48px;
  }

  &__charts,
  &__urls-table {
    width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }

  &__charts {
    margin-bottom: 24px;
  }

  &__responsive-meme {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);

    @media (min-width: 960px) {
      display: none;
    }
  }
}
</style>
