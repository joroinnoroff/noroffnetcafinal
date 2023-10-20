import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { authFetch } from '@/app/(auth)/(routes)/api/authFetch';

const DeleteButton = ({ postId }) => {
  const handleDelete = async () => {
    if (!postId) {
      throw new Error('Cannot delete post without a valid PostId');
    }

    try {
      const deletePostURL = `https://nf-api.onrender.com/api/v1/social/posts/${postId}`;
      const response = await authFetch(deletePostURL, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
         
        },
      });

      if (response.ok) {
        toast.success('Post deleted successfully');
   
      } else {
        const errorData = await response.json();
        console.error('Error deleting post:', errorData);
        toast.error('Error deleting post: There was an issue deleting the post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(`Error deleting post: ${error.message}`);
    }
  };

  return (
    <div>
      <Button variant={"destructive"} onClick={handleDelete}>
        Delete Post <Trash />
      </Button>
    </div>
  );
}

export default DeleteButton;