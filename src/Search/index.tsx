import React from 'react';
import SearchBar from './search';

// Define the prop types
interface SearchProps {
  onNextStep: (location: string) => Promise<void>;
}

const Search: React.FC<SearchProps> = ({ onNextStep }) => {    
    return (
        <SearchBar/>
    );
};

export default Search;
