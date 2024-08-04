import React, { useState, useEffect } from 'react';
import optionArray from '../utils/optionArray';
import { Subreddit } from '../models/Subreddit';

export const useSubredditOptions = (): Subreddit[] => {
  const [optionResults, setOptionResults] = useState<Subreddit[]>([]);

  useEffect(() => {
    optionArray().then((data) => {
      const processedOptions = data.map((subreddit) => ({
        value: subreddit.name,
        label: `r/${
          subreddit.name.toLowerCase().endsWith('porn')
            ? subreddit.name.toLowerCase().replace('porn', '****')
            : subreddit.name
        }`,
        icon: subreddit.icon,
        banner: subreddit.banner,
      }));
      setOptionResults(processedOptions);
    });
  }, []);

  return optionResults;
};
