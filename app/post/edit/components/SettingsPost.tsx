"use client"
import React from 'react';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Author {
  name: string,
  email: string,
  avatar: string,
  banner: string

}
interface Post {
  id: String | null | undefined;
  author: Author;
  title: string;
  body: string;
  media: string | null;
  created: string;
  comments: Comment[];
  tags: string[] | string;
  
}
interface SettingsPostProps {
  post: Post; 
}

const SettingsPost: React.FC<SettingsPostProps> = ({ post }) => {
  const router = useRouter();

  const handleEditPost = () => {
    router.push(`/post/edit?id=${post.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-muted-foreground">Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleEditPost}>
          Edit Post
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsPost;
