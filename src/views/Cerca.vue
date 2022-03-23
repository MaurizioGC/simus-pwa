<template>
  <v-container>
    <iframe
      :srcdoc="info"
      frameborder='0'
      width = "100%"
      scrolling="no"
      ref="doc"
    ></iframe>
    <v-lazy
      v-model="isActive"
      :options="{
        threshold: .5
      }"
      min-height="200"
      transition="fade-transition"
    >
      <v-row justify="center" class="mt-10">
        <v-img
          max-width="300px"
          lazy-src="../assets/no-image.jpg"
          src="https://drive.google.com/uc?export=view&id=1eRp08-WLPG1oSc60p16-cDUXYJ4ejXzx">
        </v-img>
      </v-row>
    </v-lazy>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import newsService from '../services/newsService';
import MuseoDettaglio from '../components/MuseoDettaglio.vue';
import { Museum } from '@/types';
import axios from 'axios';

@Component({
  components: {
    MuseoDettaglio
  }
})
export default class Cerca extends Vue {
  // newsArticles: NewsArticle[] = [];
  // cacheAvailable: boolean = 'caches' in self;
  isActive = true;
  info= '';
  results='';
  spyTotHeight='unset';
  // public async cacheMe () {
  //   let cache = await caches.open('preferiti');
  //   cache.put('https://drive.google.com/uc?export=view&id=0B_bb2Yu5nQndNzk4UkJBUndEV2c').then(()=> console.log("cached"));
  // }

  setH(elem:any){
    this.spyTotHeight= elem.contentWindow.document.body.scrollHeight;
    elem.style.height = elem.contentWindow.document.body.scrollHeight +100+ 'px';
  }

  mounted () {
    axios
      .get('https://docs.google.com/document/d/1X8Ea9qJXVU-Fn8xGp1gU-3yo6FQaDKqTrw5QPFb5bt8/export', {
        })
      .then(response => {
        const pp = response.data.replace(/\<body class\=\"c[0-9][0-9]?\"\>/gm,'<body>');
        this.info=pp;
        setTimeout(() => {
          this.setH(this.$refs.doc);
        }, 100); 
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
