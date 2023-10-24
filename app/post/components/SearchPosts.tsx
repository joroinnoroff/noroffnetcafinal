import { Search } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';

interface SearchPostsProps {
  onSearchQueryChange: (query: string) => void;
}

const SearchPosts: React.FC<SearchPostsProps> = ({ onSearchQueryChange }) => {
  const [searchIconVisible, setSearchIconVisible] = useState(true);

  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const query = e.target.value;
    onSearchQueryChange(query);

    setSearchIconVisible(false);
  };

  return (
    <div className='relative left-[15rem] md:left-10'>
    <input
      type="text"
      id='Search'
      placeholder='Søk etter Poster'
      className='p-2 rounded-sm border opacity-30 md:opacity-100 w-[85%] md:w-full'
      onChange={handleInputChange}
      onFocus={() => setSearchIconVisible(false)} 
    />
    {searchIconVisible && (
      <Search className='absolute right-9 text-muted-foreground top-2 rounded-sm lg:right-2' />
    )}
  </div>
  );
};

export default SearchPosts;
