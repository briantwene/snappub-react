// types/Wallpaper.ts
export interface Wallpaper {
  author: string;
  id: string;
  avatar: string;
  src: string;
  thumb: string;
  title: string;
  rating: number;
  created_at: number;
  resolution?: {
    width: number;
    height: number;
  };
}

export interface WallpaperResponse {
  images: Wallpaper[];
  next: string;
}
