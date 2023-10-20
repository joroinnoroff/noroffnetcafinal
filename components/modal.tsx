import React, { useCallback, useRef, ReactNode, useState } from "react";
import { Send, X } from "lucide-react";
import toast from "react-hot-toast";
import {authFetch} from '../app/(auth)/(routes)/api/authFetch'
import { Button } from "./ui/button";
interface Post {
    id: string;
    author: Author;
    title: string;
    body: string;
    media: string | null;
    created: string;
    comments: Comments[];
    tags: string[] | string;
    
  }
  
  interface Author {
      name: string,
      email: string,
      avatar: string,
      banner: string
   
  }
  
  interface Comments {
    body: string,
    replyToId: string,
    id: number,
    postId: string,
    owner: string,
    created: number,
    author: Author,
  }

 


interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onCommentSubmit: () => void; 
}

export default function Modal({ children, isOpen, onClose, post, onCommentSubmit }: PostModalProps) {
    const [commentText, setCommentText] = useState(""); 
    const [currentPost, setCurrentPost] = useState(post); 
  
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
  
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current && isOpen) {
        onClose();
      }
    }, [isOpen, onClose]);
  
    const handleSubmitComment = async () => {
        console.log('Request Payload:', JSON.stringify({ body: commentText }));
      
        try {
          const response = await authFetch(`https://nf-api.onrender.com/api/v1/social/posts/${post.id}/comment?_author=true`, {
            method: 'POST',
            body: JSON.stringify({ body: commentText }),
          });
      
          if (response.status === 200) {
           
            toast.success("Comment posted successfully", {
              duration: 3000,
            });
      
        
            setCommentText("");
      
            
            const updatedPost = { ...currentPost };
            const newComment = {
              body: commentText,
              replyToId: '',
              id: Date.now(),
              postId: post.id,
              owner: '', 
              created: Date.now(),
              author: post.author,
            };
            updatedPost.comments.push(newComment);
            setCurrentPost(updatedPost);
      
           
            onCommentSubmit();
          }
        } catch (error) {
          console.error(error);
          toast.error("Error posting comment");
        }
      };
      
  
    return (
      <div ref={overlay} className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80" onClick={handleClick}>
        <button type="button" onClick={onClose} className="absolute top-0 right-8 text-white">
          <X size={32} color="white" />
        </button>
        <div ref={wrapper} className="flex justify-start items-center flex-col absolute h-[95%] md:w-[768px] md:mx-auto md:left-0 md:right-0 w-full bottom-0 bg-white rounded-t-3xl lg:px-40 px-8 pt-14 pb-72 overflow-auto">
          {children}
  
          
          <div className="dark:invert p-3 flex items-center gap-2 border rounded-md shadow-sm mt-2 w-full md:w-[600px] ">
              <input
                type="text"
                placeholder="Add a comment..."
                className="p-3 md:p-8 border rounded-sm w-full"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button onClick={handleSubmitComment}> <Send /></Button>
          </div>


            <div className="text-center mt-3 ">tags:
          <div className="mt-3">
            <p className="py-2 border">{post.tags}</p>
          </div>
          </div>
        </div>
      </div>
    );
  }