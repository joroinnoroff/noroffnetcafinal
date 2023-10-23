"use client"
import React from 'react';
import { Settings } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from 'react-hot-toast';

interface Author {
  name: string,
  email: string,
  avatar: string,
  banner: string

}
interface Post {
  id: string;
  author: Author;
  title: string;
  body: string;
  media: string | null;
  created: string;
  comments: Comment[];
  tags: string[] | string;
  
}
interface SettingsPostProps {
  post: any; 
}

const SettingsPost: React.FC<SettingsPostProps> = ({ post }) => {
  const router = useRouter();

 const handleEditPost = () => {
  if (isPost(post)) {
    router.push(`/post/edit?id=${post.id}`);
  } else {
    toast.error("No Post to Edit");
    redirect("/post");
  }
};

function isPost(obj: any): obj is Post {
  return 'id' in obj;
}
  

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
