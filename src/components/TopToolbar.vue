<template>
  <div>

    <v-app-bar
      
      absolute
      dark
      shrink-on-scroll
      prominent
      color="primary"
      fade-img-on-scroll
      :src="require('@/assets/simus_logo.png')"
    >

      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          contain
        ></v-img>
      </template>

    </v-app-bar>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { Getter } from 'vuex-class';

@Component
export default class TopToolbar extends Vue {
  // @Getter('title', { namespace: 'topToolbar' }) title!: string;

  showMenu = false;

  toggleMenu (): void {
    this.showMenu = !this.showMenu;
  }

  doNothing (): void {
    console.info('Not doing anything!');
  }
}
</script>
