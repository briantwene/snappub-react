//import zustland
import create from 'zustand';

const useStore = create((set) => ({
  current_subreddit: 'wallpaper',
  page: 0,
  pageMap: new Map([[0, null]]),
  changeSubreddit: (subreddit) =>
    set((state) => ({
      current_subreddit: subreddit,
      page: 0,
      pageMap: new Map([[0, null]]),
    })),
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
