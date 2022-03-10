<template>

  <v-bottom-navigation
    app
    fixed
    grow
    height="36px"
    v-model="activeItem"
    color="primary"
  >
    <v-btn value="top" :to="{ path: '/'}">
      <span>Musei</span>
      <v-icon>museum</v-icon>
    </v-btn>

    <v-btn value="code" :to="{ name: 'code-examples'}">
      <span>Scan</span>
      <v-icon>qr_code_scanner</v-icon>
    </v-btn>

    <v-btn value="favorites" :to="{ name: 'my-favorites'}">
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>
  </v-bottom-navigation>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BottomNav extends Vue {
  activeItem = 'top';
}
</script>

<style scoped>
  .v-btn {
    letter-spacing: normal;
  }
</style>
