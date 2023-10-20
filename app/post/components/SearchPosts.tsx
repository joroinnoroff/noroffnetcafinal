import { Search } from 'lucide-react';
import React, { ChangeEvent } from 'react';

interface SearchPostsProps {
  onSearchQueryChange: (query: string) => void;
}

const SearchPosts: React.FC<SearchPostsProps> = ({ onSearchQueryChange }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearchQueryChange(query);
  };

  return (
    <div className='hidden lg:flex'>
      <input
        type="text"
        placeholder='Søk etter Poster'
        className='p-2 rounded-sm border'
        onChange={handleInputChange}
      />
      <Search className='absolute right-1 top-2' />
    </div>
  );
};

export default SearchPosts;
