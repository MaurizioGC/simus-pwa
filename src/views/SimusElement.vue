<template>
    <v-card class="mt-10">
      <v-card-title>test</v-card-title>
      <!-- <p class="error">{{ error }}</p>
      <p class="decode-result">Last result: <b>{{ result }}</b></p> -->
      <!-- <v-responsive max-width="200px" max-height="200px">
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </v-responsive> -->
    </v-card>
  <!-- <div>
    <NewsList :newsArticles="newsArticles"></NewsList>
  </div> -->

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import newsService from '../services/newsService';
import NewsList from '../components/NewsList.vue';
import { ArticleType, NewsArticle } from '@/types';

@Component({
  components: {
    NewsList
  }
})
export default class SimusElement extends Vue {
    newsArticles: NewsArticle[] = [];

    mounted () {
      newsService.getArticlesByType(ArticleType.CodeExample)
        .then((newsArticles: NewsArticle[]) => {
          this.newsArticles = newsArticles;
        });
    }
}
</script>
