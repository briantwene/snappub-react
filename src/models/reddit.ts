export interface SubredditListingAPIResponse {
  data: {
    children: {
      data: {
        author: string;
        id: string;
        url: string;
        preview: {
          images: {
            resolutions: {
              url: string;
            }[];
          }[];
        };
        title: string;
        score: number;
        created_utc: number;
      };
    }[];
    after: string;
    before: string;
  };
}

export type RawWallpaper =
  SubredditListingAPIResponse['data']['children'][number]['data'];

export type RawWallpaperContainer = {
  data: RawWallpaper;
};

export interface Wallpaper {
  author: string;
  id: string;
  avatar?: string;
  src: string;
  thumb: string;
  title: string;
  rating: number;
  created_at: number;
  metadata?: {
    width: number;
    height: number;
    type: string;
    mime: string;
  };
}

export interface DetailedWallpaper extends Wallpaper {
  subreddit: string;
  size: string;
  karma?: number;
}

export interface SubredditResponseModel {
  next: string;
  prev: string;
  posts: Wallpaper[];
}
