//import zustland
import create from 'zustand';

const useStore = create((set) => ({
  current_subreddit: 'wallpaper',
  subredditBanner:
    'https://styles.redditmedia.com/t5_2qmjl/styles/bannerBackgroundImage_2qok6gpoiud71.png?width=4000&s=6b7f7b1846d648c37b4c12393a8ba2fe067300ca',
  page: 0,
  pageMap: new Map([[0, null]]),
  changeSubreddit: (subreddit) =>
    set((state) => ({
      current_subreddit: subreddit,
      page: 0,
      pageMap: new Map([[0, null]]),
    })),
  setSubredditBanner: (banner) => set((state) => ({ subredditBanner: banner })),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  decrementPage: () => set((state) => ({ page: Math.max(state.page - 1, 0) })),
  resetPage: () => set((state) => ({ page: 0 })),
  updatePageMap: (currentPage) => {
    set((state) => {
      const { page, pageMap } = state;
      if (!pageMap.has(page + 1))
        return { pageMap: pageMap.set(page + 1, currentPage) };
    });
  },
}));

export const useSubredditStore = useStore;
