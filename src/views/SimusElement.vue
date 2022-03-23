<template>
  <v-card class="mt-10">
    <v-card-title>test</v-card-title>
    <v-card-text>
        nome: {{slug}} - {{folderData}} 
     </v-card-text>
  </v-card>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';


@Component({
  components: {
    //NewsList
  }
})
export default class SimusElement extends Vue {
  title(){
    // return this.folderData.
  }

  description(){}
  
  images(){}

  videos(){}

  audios(){}

  folderData=this.$route.params.folderData;
  slug=this.$route.params.slug;
}
</script>
