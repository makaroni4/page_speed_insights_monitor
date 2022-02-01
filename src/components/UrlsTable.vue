<template>
  <table class="urls-table">
    <thead>
      <tr>
        <th rowspan="2">URL</th>

        <th class="urls-table__device-type-row" colspan="4">Mobile</th>
        <th class="urls-table__device-type-row" colspan="4">Desktop</th>
      </tr>

      <tr>
        <th
          class="urls-table__metric-name"
          v-for="metric in dashboardConfig.metrics"
          v-on:click="sortBy('mobile', metric)"
          v-bind:key="'th-' + metric + '-mobile'"
        >
          {{ dashboardConfig.metricsNames[metric] }}
          <span
            v-bind:key="`${metric}:${url}:mobile`"
            v-if="sortDeviceType === 'mobile' && sortMetric === metric"
            v-bind:class="sortDirectionCssClass()"
          ></span>
        </th>

        <th
          class="urls-table__metric-name"
          v-for="metric in dashboardConfig.metrics"
          v-on:click="sortBy('desktop', metric)"
          v-bind:key="'th-' + metric + '-desktop'"
        >
          {{ dashboardConfig.metricsNames[metric] }}
          <span
            v-bind:key="`${metric}:${url}:desktop`"
            v-if="sortDeviceType === 'desktop' && sortMetric === metric"
            v-bind:class="sortDirectionCssClass()"
          ></span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="url in urls"
        v-bind:key="url"
        v-on:click="setCurrentUrl(url)"
        v-bind:class="urlRowCssClass(url)"
      >
        <td class="urls-table__url">
          {{ url }}

          <a
            class="urls-table__open-url"
            v-bind:href="currentUrl"
            target="_blank"
          >
          </a>

          <a
            class="urls-table__open-psi-report"
            v-bind:href="PSIUrl(currentUrl)"
            target="_blank"
          >
          </a>
        </td>

        <td
          :key="metric"
          v-for="metric in dashboardConfig.metrics"
          v-bind:class="tdClass(url, 'mobile')"
        >
          {{ latestMetric(url, "mobile", metric) }}
        </td>

        <td
          :key="metric"
          v-for="metric in dashboardConfig.metrics"
          v-bind:class="tdClass(url, 'desktop')"
        >
          {{ latestMetric(url, "desktop", metric) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import dashboardConfig from "@/configs/dashboard-config";

export default {
  name: "UrlsTable",
  data() {
    return {
      dashboardConfig: dashboardConfig,
      currentUrl: null,
      sortDirection: 1,
      sortDeviceType: "mobile",
      sortMetric: "speed_index",
    };
  },
  computed: {
    ...mapGetters(["pages"]),
    urls(): [] {
      return this.pages.map((page: any) => page.url);
    },
  },
  methods: {
    urlRowCssClass(url): string {
      let cssClass = "urls-table__row";

      // if (this.currentUrl === url) {
      //   cssClass += " urls-table__row--active";
      // }

      return cssClass;
    },
    PSIUrl(url: string): string {
      return `https://developers.google.com/speed/pagespeed/insights/?url=${url}`;
    },
    sortDirectionCssClass(): string {
      return (
        "urls-table__sort-direction urls-table__sort-direction--" +
        (this.sortDirection === 1 ? "down" : "up")
      );
    },
    speedIndexScale(url, deviceType) {
      var latestSpeedIndex = this.latestMetric(url, deviceType, "speed_index");

      if (latestSpeedIndex > 89) {
        return "fast";
      } else if (latestSpeedIndex > 49) {
        return "average";
      } else {
        return "slow";
      }
    },
    setCurrentUrl(url) {
      // this.currentUrl = url;
    },
    latestMetric(url, deviceType, metricName) {
      // const urlData = this.dashboardStore.urlData[url][deviceType];

      // const latestTimestamp = Object.keys(urlData).sort(function(a, b){
      //   return new Date(b) - new Date(a);
      // })[0];

      // const latestValue = urlData[latestTimestamp][metricName];

      // return latestValue.toFixed(this.dashboardConfig.metricScales[metricName]);

      return 99;
    },
    sortBy(deviceType, metric, sortDirection = this.sortDirection) {
      // this.sortDeviceType = deviceType;
      // this.sortMetric = metric;
      // this.urls.sort((a, b) => {
      //   return sortDirection * (this.latestMetric(b, this.sortDeviceType, this.sortMetric) - this.latestMetric(a, this.sortDeviceType, this.sortMetric))
      // });
      // this.sortDirection *= -1;
    },
    tdClass(url, deviceType) {
      return (
        "urls-table__metric-value urls-table__metric-value--" +
        this.speedIndexScale(url, deviceType)
      );
    },
  },
  mounted() {
    this.sortBy("mobile", "speed_index", -1);

    this.currentUrl = this.urls[0];
  },
};
</script>

<style lang="scss">
.urls-table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  border-radius: 2px;

  &,
  & th,
  & td {
    border: 1px solid grey;
  }

  th {
    padding: 4px;

    font-size: 12px;
    line-height: 16px;
    text-align: center;

    &.urls-table__device-type-row {
      line-height: 32px;
    }

    &:first-child {
      width: 320px;
    }
  }

  & td {
    width: 24px;
    padding: 4px;

    &:not(:first-child) {
      text-align: center;
    }
  }

  &__url {
    font-size: 12px;
    line-height: 16px;

    word-wrap: break-word;
  }

  &__row {
    height: 48px;

    &--active td {
      opacity: 0.8;
    }

    &:hover td {
      opacity: 0.8;
    }
  }

  &__metric-name,
  &__row {
    cursor: pointer;
  }

  &__open-url {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;

    background: url("../assets/external-link.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }

  &__open-psi-report {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;

    background: url("../assets/psi-link.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }

  &__metric-value--fast {
    background-color: green;

    color: black;
  }

  &__metric-value--average {
    background-color: orange;

    color: black;
  }

  &__metric-value--slow {
    background-color: red;

    color: black;
  }

  &__metric-name {
    position: relative;
  }

  &__sort-direction {
    display: inline-block;
    width: 8px;
    height: 8px;
    position: absolute;
    right: 4px;
    bottom: 4px;

    &--down {
      background: url("../assets/triangle.svg");
      background-size: contain;
      background-repeat: no-repeat;
    }

    &--up {
      background: url("../assets/triangle.svg");
      background-size: contain;
      background-repeat: no-repeat;

      transform: scaleY(-1);
    }
  }
}
</style>
