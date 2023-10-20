"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import useRouter conditionally
import { createPost } from '../../(auth)/(routes)/api/posts/create';

import {
  CardFooter,
} from "@/components/ui/card";
import { Image } from 'lucide-react';

const NewPostPage = () => {
  const router = useRouter();

  const [postData, setPostData] = useState({
    title: '',
    body: '',
    media: '',
    tags: [''],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: name === 'tags' ? value.split(',') : value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost(postData);
      router.push('/post');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='flex items-center flex-col mt-32'>
      <div className='flex flex-col mt-5'>
        <h1 className='text-2xl font-semibold text-center'>Create New Post</h1>
        <form onSubmit={handleSubmit} className="py-10">
          <div className='container border w-full h-full py-10 rounded-md flex flex-col items-center justify-center gap-5'>
          <div className="mb-4 p-2 flex items-center justify-center flex-col">
              <label htmlFor="media" className="block text-gray-700 text-sm text-center font-bold mb-2">
                Image URL

<div className="flex items-center justify-center">
  <Image width={30} height={30}  />
</div>

              </label>

              <input
                type="url"
                name="media"
                id="media"
                className="text-center text-md md:text-xl p-2 rounded-sm border "
                value={postData.media}
                onChange={handleInputChange}
              />
          
              <div className='mt-3 w-full lg:w-[800px] flex items-center justify-center'>
                {postData.media && <img src={postData.media}  alt="" />}
              </div>
            </div>
            <div className='dark:invert text-center p-2'>
              
              <label>
                <h2 className="text-foreground-muted dark:invert font-semibold text-xl md:text-2xl">Title of Post</h2>
                <input
                  type="text"
                  required
                  name="title"
                  className='border dark:invert p-2 rounded-sm text-center'
                  value={postData.title}
                  onChange={handleInputChange}
                  placeholder="Title of Post"
                />
              </label>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <label className='text-muted-foreground dark:invert font-semibold text-md'>
                Share Your Thoughts
              </label>
              <textarea
                name="body"
                required
                value={postData.body}
                className="rounded-sm resize-none p-10 md:p-20 text-center mt-1 border"
                onChange={handleInputChange}
                placeholder="Start Typing..."
              />
            </div>

            <div className='text-center mt-4 flex flex-col dark:invert'>
              <div className='flex flex-col gap-2 '>
                <label>Tags</label>
                <input
  type="text"
  name="tags"
  className='border'
  value={postData.tags.join(',')} 
  onChange={handleInputChange}
/>

              </div>
              <CardFooter className="flex-row gap-3 items-end justify-center mt-10">
                <div className='flex items-center justify-center gap-3 '>
                  <Button className='transition-all' variant={"outline"}>Create Post +</Button>
                </div>
                <Button variant="default"><a href="/post">Cancel</a></Button>
              </CardFooter>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostPage;
