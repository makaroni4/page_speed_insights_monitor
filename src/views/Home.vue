<template>
  <div class="psi-dashboard container-xl p-6" v-if="dataIsReady">
    <div class="psi-dashboard__header">
      <Header />
    </div>

    <div class="psi-dashboard__urls-table">
      <UrlsTable />
    </div>

    <div class="psi-dashboard__charts">
      <MetricCharts />
    </div>

    <div class="psi-dashboard__footer">
      <Footer />
    </div>
  </div>
  <LoadingSpinner v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "@/components/Header.vue";
import UrlsTable from "@/components/UrlsTable.vue";
import MetricCharts from "@/components/MetricCharts.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Footer from "@/components/Footer.vue"; // @ is an alias to /src
import { mapGetters } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    Header,
    UrlsTable,
    Footer,
    LoadingSpinner,
    MetricCharts,
  },
  computed: {
    ...mapGetters(["dataIsReady"]),
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
    margin-left: auto;
    margin-right: auto;
  }

  &__charts {
    margin-bottom: 24px;
  }
}
</style>
