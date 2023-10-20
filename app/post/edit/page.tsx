"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { updatePost } from '@/app/(auth)/(routes)/api/posts/update.js';
import { useRouter } from 'next/navigation'; // Updated import
import { getPost } from '@/app/(auth)/(routes)/api/posts/read';
import toast from "react-hot-toast";
import { Image, Trash } from 'lucide-react';
import { API_SOCIAL_URL } from '../../(auth)/(routes)/api/constants'; // Import your API_SOCIAL_URL here
import { authFetch } from '../../(auth)/(routes)/api/authFetch'; // Import your authFetch function here
import { removePosts } from '@/app/(auth)/(routes)/api/posts/delete';
import DeleteButton from './components/DeleteButton';
import { redirect } from 'next/dist/server/api-utils';





const EditPage = () => {
  const [post, setPost] = useState({
    id: '',
    title: '',
    body: '',
    tags: ["string"],
    media: 'url',
  });

  const router = useRouter();

  
  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    if (id) {
      const getPostURL = `${API_SOCIAL_URL}/posts/${id}`;

      authFetch(getPostURL)
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            setPost(data);
          } else {
            console.error('Error fetching post data:', response);
          }
        })
        .catch((error) => console.error('Error fetching post data:', error));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: name === 'tags' ? value.split(',') : value,
    }));
  };

  const updatePost = async (postData) => {
    if (!postData.id) {
      throw new Error("Update requires a PostId");
    }

    const updatePostURL = `${API_SOCIAL_URL}/posts/${postData.id}`;
    const response = await authFetch(updatePostURL, {
      method: 'PUT', // Adjust this method if needed
      body: JSON.stringify(postData),
    });

    console.log(response);
    
    if (response.ok) {
      const updatedPostData = await response.json();
      setPost(updatedPostData);
      toast.success('Changes Saved');
      router.push('/post'); // Redirect using router.push('/post')
    } else {
      console.error('Error updating post: Response from the server is not as expected.');
      toast.error('Error updating post: Response from the server is not as expected.');
    } 
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Call the updatePost function
    try {
      await updatePost(post);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(`Error updating post: ${error.message}`);
    }
  };


  return (
    <div className="mt-32">
      <div className="text-center">
        <h1>Edit Post</h1>
      </div>

      <div className="container flex items-center justify-center p-3 text-center">
        <div className="border px-5 py-10 rounded-sm shadow-md">
          <form onSubmit={handleSaveChanges}>

          <div className="mb-4 p-2 flex items-center justify-center flex-col">
              <label htmlFor="title" className="flex items-center justify-center text-gray-700 text-sm font-bold mb-2">
                Edit Media
              <Image color='grey' width={20} height={20} alt="image-upload" />
  
              </label>
              <input
                type={post.media}
                value={post.media}
                name="media"
                id="media"
                onChange={handleChange}
                className="text-center text-md md:text-xl"
              />
<div className='mt-3'>
                <img src={post.media} width={300} alt="" />
</div>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Edit Title
              </label>
              <input
                type="text"
                value={post.title}
                name="title"
                id="title"
                onChange={handleChange}
                className="text-center text-md md:text-xl w-full"
              />
            </div>



            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Edit Message
              </label>
              <textarea
                name="body"
                id="message"
                cols="30"
                rows="5"
                required
                maxLength={100}
                value={post.body}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg resize-none shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-center text-l md:text-2xl"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
                Edit tags
              </label>
              <input
  type="text"
  name="tags"
  className='border'
  value={post.tags.join(',')} // Join tags into a comma-separated string
  onChange={handleChange}
/>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button type="submit">Save Changes</Button>
              <div>
                <Button variant={"secondary"}>Cancel</Button>
              </div>

              <DeleteButton postId={post.id} />

          
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
