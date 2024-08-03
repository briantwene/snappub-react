'use client';
import React from 'react';
import Select, {
  OptionProps,
  components,
} from 'react-select';
import { Subreddit } from '../models/Subreddit';
import '../Sass/App.scss';

interface SubredditSelectProps {
  options: Subreddit[];
  defaultVal: Subreddit;
  //not ideal but for now any works here
  handleChange: (selectedOption: any) => void;
  //   getLabel: (subreddit: Subreddit) => React.ReactNode;
}

const CustomOption: React.FC<OptionProps<Subreddit>> = (props) => {
  //console.log(data, 'SubredditSelectProps');
  return (
    // <div className="dropdown-label">
    //   <img src={data?.icon} alt="subreddit icon" />
    //   <span className="dropdown-label-text">{data?.label}</span>
    // </div>

    <components.Option {...props} />
  );
};

const SubredditSelect: React.FC<SubredditSelectProps> = ({
  options,
  defaultVal,
  handleChange,
}) => {
  console.log('OPTIONS', options);
  return (
    <Select
      options={options}
      defaultValue={defaultVal}
      isMulti={false}
      onChange={handleChange}
      autoFocus={true}
      isSearchable={false}
      components={{ Option: CustomOption }}
      //   getOptionLabel={getLabel}
    />
  );
};

export default SubredditSelect;
