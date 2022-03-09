// Store modules state
export interface TopToolbarState {
  title: string;
}

export enum ArticleType {
  TopStory = 'TOP_STORY',
  CodeExample = 'CODE_EXAMPLE'
}

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  dateString: string;
  baseImageName: string;
  articleType: ArticleType;
  isFavourite: boolean;
}

// Store root state
export interface RootState {
  topToolbar: TopToolbarState;
}
