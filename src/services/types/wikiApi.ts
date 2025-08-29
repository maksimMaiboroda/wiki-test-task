export type OnThisDayEvent = {
  year: number;
  text: string;
  title?: string;
  extract?: string;
  pageId?: number;
  contentUrl?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
};
