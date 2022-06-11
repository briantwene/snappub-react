import React, { useState, useEffect } from 'react';
import optionArray from '../utils/optionArray';

function UseSubredditOptions() {
  const [optionResults, setOptionResults] = useState([]);

  useEffect(() => {
    optionArray().then((data) => {
      setOptionResults(data);
    });
  }, []);

  const subredditOptions = optionResults.map((subreddit) => {
    return {
      value: subreddit.name,
      label: `r/${subreddit.name}`,
      icon: (
        <img
          src={subreddit.icon}
          alt={subreddit.name}
          className="subreddit-icon"
        />
      ),
    };
  });
  return subredditOptions;
}

export default UseSubredditOptions;
