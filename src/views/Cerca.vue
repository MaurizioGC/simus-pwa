<template>
  <div>
    <iframe
      :srcdoc="info"
      width = "100%"
      height="600px"
      style="border:none;display:block;"
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
          src="https://drive.google.com/uc?export=view&id=0B_bb2Yu5nQndNzk4UkJBUndEV2c">
        </v-img>
      </v-row>
    </v-lazy>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import newsService from '../services/newsService';
import NewsList from '../components/NewsList.vue';
import { NewsArticle } from '@/types';
import axios from 'axios';

@Component({
  components: {
    NewsList
  }
})
export default class Cerca extends Vue {
  newsArticles: NewsArticle[] = [];
  cacheAvailable: boolean = 'caches' in self;
  isActive = true;
  info= '';
  // public async cacheMe () {
  //   let cache = await caches.open('preferiti');
  //   cache.put('https://drive.google.com/uc?export=view&id=0B_bb2Yu5nQndNzk4UkJBUndEV2c').then(()=> console.log("cached"));
  // }

  mounted () {
    axios
      .get('https://docs.google.com/document/d/1U29jThK-S0XWhiTR41bKeltJsIPfmogJa5rAfk1pQd8/export')
      .then(response => {
        this.info = response.data;
        console.log(response);
      });

    newsService.getFavorites()
      .then((newsArticles: NewsArticle[]) => {
        this.newsArticles = newsArticles;
      });
  }
}
</script>
