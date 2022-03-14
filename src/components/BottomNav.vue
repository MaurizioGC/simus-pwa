<template>

  <v-bottom-navigation
    app
    fixed
    grow
    height="38px"
    v-model="activeItem"
    color="primary"
    background-color="#F5F5F5"
  >
    <v-btn class="pt-1" value="top" :to="{ path: '/'}">
      <span>Musei</span>
      <v-icon>museum</v-icon>
    </v-btn>

    <v-btn class="pt-1" value="qrcode" :to="{ name: 'qrcode'}">
      <span>Scan</span>
      <v-icon>qr_code_scanner</v-icon>
    </v-btn>

    <v-btn class="pt-1" value="favorites" :to="{ name: 'preferiti'}">
      <span>Preferiti</span>
      <v-icon>favorite</v-icon>
    </v-btn>

    <v-btn class="pt-1" value="cerca" :to="{ name: 'cerca'}">
      <span>Cerca</span>
      <v-icon>search</v-icon>
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
