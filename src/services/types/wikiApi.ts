export interface ApiError {
  status: number;
  data?: {
    error: string;
    message?: string;
  };
  error: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

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
