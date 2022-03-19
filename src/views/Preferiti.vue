<template>

  <v-container>
    <NewsList :newsArticles="newsArticles"></NewsList>
    <v-row justify="center" class="mt-10">
      <v-img max-width="300px" src="https://drive.google.com/uc?export=view&id=1eRp08-WLPG1oSc60p16-cDUXYJ4ejXzx">
      </v-img>
    </v-row>
    <!-- <v-row>
      <p v-if="cacheAvailable" @click="cacheMe">Cache Available. Click mo to cache image</p>
    </v-row> -->
  </v-container>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import newsService from '../services/newsService';
import NewsList from '../components/NewsList.vue';
import { NewsArticle } from '@/types';

@Component({
  components: {
    NewsList
  }
})
export default class Preferiti extends Vue {
  newsArticles: NewsArticle[] = [];
  cacheAvailable: boolean = 'caches' in self;

  // public async cacheMe () {
  //   let cache = await caches.open('preferiti');
  //   cache.put('https://drive.google.com/uc?export=view&id=0B_bb2Yu5nQndNzk4UkJBUndEV2c').then(()=> console.log("cached"));
  // }

  mounted () {
    newsService.getFavorites()
      .then((newsArticles: NewsArticle[]) => {
        this.newsArticles = newsArticles;
      });
  }
}
</script>
