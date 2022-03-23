import { Museum } from '@/types';

const url = '/data/articles.json';

class SimusService {
  getMuseums (): Promise<Museum[]> {
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((serverMuseums) => {
        const Museums = serverMuseums
          .map(SimusService.map);
        return Museums;
      })
      .catch((e) => {
        console.error('An error occurred retrieving the museum data from ' + url, e);
      });
  }

  // getFavorites (): Promise<Museum[]> {
  //   return fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((serverMuseums) => {
  //       const Museums = serverMuseums
  //         .filter((serverMuseum: Museum) => serverMuseum.isFavourite === true)
  //         .map(NewsService.map);

  //       return Museums;
  //     })
  //     .catch((e) => {
  //       console.error('An error occurred retrieving the news articles from ' + url, e);
  //     });
  // }

  private static map (serverMuseum: Museum): Museum {
    return {
      id: serverMuseum.id,
      title: serverMuseum.title,
      content: serverMuseum.content,
      baseImageName: serverMuseum.baseImageName,
    } as Museum;
  }
}

export default new SimusService();
