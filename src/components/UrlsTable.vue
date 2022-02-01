<template>
  <div class="urls-table">
    <tbody>
      <tr :key="page.url" v-for="page in pages">
        <td>
          {{ page.url }}
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";

export default {
  name: "UrlsTable",
  computed: {
    ...mapGetters(["pages"]),
  },
};
</script>
