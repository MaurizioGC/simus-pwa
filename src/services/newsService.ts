import { ArticleType, NewsArticle } from '@/types';

const url = '/data/articles.json';

class NewsService {
  getArticlesByType (articleType: ArticleType): Promise<NewsArticle[]> {
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((serverArticles) => {
        const newsArticles = serverArticles
          .filter((serverArticle: NewsArticle) => serverArticle.articleType === articleType)
          .map(NewsService.map);

        return newsArticles;
      })
      .catch((e) => {
        console.error('An error occurred retrieving the news articles from ' + url, e);
      });
  }

  getFavorites (): Promise<NewsArticle[]> {
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((serverArticles) => {
        const newsArticles = serverArticles
          .filter((serverArticle: NewsArticle) => serverArticle.isFavourite === true)
          .map(NewsService.map);

        return newsArticles;
      })
      .catch((e) => {
        console.error('An error occurred retrieving the news articles from ' + url, e);
      });
  }

  private static map (serverArticle: NewsArticle): NewsArticle {
    return {
      id: serverArticle.id,
      title: serverArticle.title,
      content: serverArticle.content,
      dateString: serverArticle.dateString,
      baseImageName: serverArticle.baseImageName,
      articleType: serverArticle.articleType,
      isFavourite: serverArticle.isFavourite
    } as NewsArticle;
  }
}

export default new NewsService();
