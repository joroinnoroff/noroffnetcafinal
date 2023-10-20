"use client"
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'
const FilterPost = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('Newest'); // Use useState to define 'filter'
  const [showMedia, setShowMedia] = useState(false); // Use useState to define 'showMedia'

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    onFilterChange(newFilter, showMedia);
  };

  const handleShowMediaChange = () => {
    setShowMedia(!showMedia);
    onFilterChange(filter, !showMedia);
  };

  return (
    <div className="p-2 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center hover:bg-gray-100 hover:text-black p-1 border rounded-sm dark:invert text-muted-foreground">
          Filter
          <SlidersHorizontal width={15} height={15} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`cursor-pointer p-1 flex items-center justify-center ${
              filter === 'Newest' ? 'text-yellow-500' : ''
            }`}
            onClick={() => handleFilterChange('Newest')}
          >
            Nyeste Poster
          </DropdownMenuItem>
    
          <DropdownMenuItem
            className={`cursor-pointer flex items-center justify-center ${
              filter === 'Oldest' ? 'text-yellow-500' : ''
            }`}
            onClick={() => handleFilterChange('Oldest')}
          >
            Eldste Poster
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer flex items-center justify-center ${
              filter === 'MostComments' ? 'text-yellow-500' : ''
            }`}
            onClick={() => handleFilterChange('MostComments')}
          >
            Mest kommentarer
          </DropdownMenuItem>

          <DropdownMenuItem
            className={`cursor-pointer flex items-center justify-center ${
              filter === 'MostLiked' ? 'text-yellow-500' : ''
            }`}
            onClick={() => handleFilterChange('MostLiked')}
          >
            Mest Likt
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer flex items-center justify-center ${showMedia ? 'text-yellow-500' : ''}`}
            onClick={handleShowMediaChange}
          >
            Inneholder Bilder
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer flex items-center justify-center ${
              filter === 'Tagged' ? 'text-yellow-500' : ''
            }`}
            onClick={() => handleFilterChange('Tagged')}

          >
            Inneholder Tags
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer flex items-center justify-center ${
              filter === 'Tagged' ? 'text-yellow-500' : ''
            }`}
            onClick={() => handleFilterChange('MyPosts')}

          >
            Mine Poster
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterPost;