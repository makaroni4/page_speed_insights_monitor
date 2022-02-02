<template>
  <div class="metric-charts">
    <div class="metric-charts__header">
      <div class="metric-charts__current-url">
        {{ currentUrl }}
      </div>
    </div>

    <div class="metric-charts__datepicker">
      <div class="metric-charts__date">
        <label>From</label>
        <Datepicker v-model="startDate" @update="startDateChanged" />
      </div>

      <div class="metric-charts__date">
        <label>To</label>
        <Datepicker v-model="finishDate" @update="finishDateChanged" />
      </div>
    </div>

    <div class="metric-charts__report">
      <div class="metric-charts__column">
        <div class="metric-charts__device-type metric-charts__device-type--mobile">
          Mobile
        </div>

        <div class="metric-charts__charts">
          <div class="metric-charts__chart" v-for="metric in dashboardConfig.metrics" :key="`mobile-${metric}`">
            <Chart
              :metric="metric"
              :deviceType="'mobile'"
              :url="currentUrl"
              :startDate="startDate"
              :finishDate="finishDate" />
          </div>
        </div>
      </div>

      <div class="metric-charts__column">
        <div class="metric-charts__device-type metric-charts__device-type--desktop">
          Desktop
        </div>

        <div class="metric-charts__chart" v-for="metric in dashboardConfig.metrics" :key="`desktop-${metric}`">
          <Chart
            :metric="metric"
            :deviceType="'desktop'"
            :url="currentUrl"
            :startDate="startDate"
            :finishDate="finishDate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./Chart.vue";
import DashboardConfig from "../configs/dashboard-config";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import { mapGetters } from "vuex";

const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 2);

const finishDate = new Date();

export default {
  name: "MetricCharts",
  data() {
    return {
      startDate: startDate,
      finishDate: finishDate,
      dashboardConfig: DashboardConfig,
    };
  },
  computed: {
    ...mapGetters(["currentUrl"]),
  },
  components: {
    Chart,
    Datepicker,
  },
  methods: {
    startDateChanged(newDate) {
      this.startDate = newDate;
    },
    finishDateChanged(newDate) {
      this.finishDate = newDate;
    }
  }
};
</script>

<style lang="scss">
.metric-charts {
  &__current-url {
    font-size: 24px;
    line-height: 32px;
  }

  &__datepicker {
    display: flex;
    margin-bottom: 32px;
  }

  &__date {
    &:not(:first-child) {
      margin-left: 16px;
    }
  }

  &__header {
    margin-bottom: 32px;
  }

  &__report {
    display: flex;
    justify-content: space-between;
  }

  &__device-type {
    position: relative;
    padding-left: 32px;

    margin-bottom: 24px;

    font-size: 24px;
    line-height: 24px;

    &--mobile {
      &:before {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 24px;
        height: 24px;

        background: url("../assets/mobile.svg");
        background-size: contain;
        background-repeat: no-repeat;

        content: "";
      }
    }

    &--desktop {
      &:before {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 24px;
        height: 24px;

        background: url("../assets/desktop.svg");
        background-size: contain;
        background-repeat: no-repeat;

        content: "";
      }
    }
  }
}
</style>
