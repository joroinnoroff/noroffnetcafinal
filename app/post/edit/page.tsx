"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
 
import { redirect, useRouter } from 'next/navigation'; 
 
import toast from "react-hot-toast";
import { Image, Trash } from 'lucide-react';
import { API_SOCIAL_URL } from '../../(auth)/(routes)/api/constants'; 
import { authFetch } from '../../(auth)/(routes)/api/authFetch'; 
 




const EditPage = () => {
  const [post, setPost] = useState({
    Id: '',
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
           
            setPost({ ...data, Id: id });
          } else {
            console.error('Error fetching post data:', response);
          }
        })
        .catch((error) => console.error('Error fetching post data:', error));
    }
  }, []);
  


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const updatePost = async (postData: { Id?: string; title?: string; body?: string; tags?: string[]; media?: string; id?: any; }) => {
    if (!postData.id) {
      throw new Error("Update requires a PostId");
    }

    const updatePostURL = `${API_SOCIAL_URL}/posts/${postData.id}`;
    const response = await authFetch(updatePostURL, {
      method: 'PUT', 
      body: JSON.stringify(postData),
    });

    console.log(response);
    
    if (response.ok) {
      const updatedPostData = await response.json();
      setPost(updatedPostData);
      toast.success('Changes Saved');
      router.push('/post'); 
    } else {
      console.error('Error updating post: Response from the server is not as expected.');
      toast.error('Error updating post: Response from the server is not as expected.');
    } 
  };

  const handleSaveChanges = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await updatePost(post);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(`Error updating post: ${error}`);
    }
  };
  


  const handleDelete = async () => {
 
  
    try {
      const deletePostURL = `https://nf-api.onrender.com/api/v1/social/posts/${post.Id}`;
      const response = await authFetch(deletePostURL, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (response.ok) {
        toast.success('Post deleted successfully');
        redirect("/post")
       
      } else {
        const errorData = await response.json();
        console.error('Error deleting post:', errorData);
        toast.error('Error deleting post: There was an issue deleting the post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(`Error deleting post: ${error}`);
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
  value={post.tags.join(',')} 
  onChange={handleChange}
/>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button type="submit">Save Changes</Button>
              <div>
                <Button variant={"secondary"}>Cancel</Button>
              </div>

              <Button onClick={handleDelete} variant="destructive">
                Delete <Trash />
              </Button>

          
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
