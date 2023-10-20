// FollowButton.tsx
import { Button } from '@/components/ui/button';
import { UserCheck, UserPlus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {authFetch} from '../../(auth)/(routes)/api/authFetch'

interface FollowButtonProps {
  profileName: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ profileName }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
  
    const fetchFollowStatus = async () => {
      try {
        const response = await authFetch(
          `https://nf-api.onrender.com/api/v1/social/profiles/${profileName}/follow`,
          {
            method: 'GET',
          }
        );
        if (response.status === 200) {
          setIsFollowing(true);
        } else if (response.status === 404) {
          setIsFollowing(false);
        }
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    fetchFollowStatus();
  }, [profileName]);

  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        const response = await authFetch(
          `https://nf-api.onrender.com/api/v1/social/profiles/${profileName}/unfollow`,
          {
            method: 'PUT',
            body: JSON.stringify({}),
          }
        );

        if (response.status === 200) {
          setIsFollowing(false);
          toast.success(`Unfollowed ${profileName}`, {
            duration: 3000,
          });
        } else {
          console.error('Error unfollowing the profile');
          toast.error('Error unfollowing the profile');
        }
      } else {
        const response = await authFetch(
          `https://nf-api.onrender.com/api/v1/social/profiles/${profileName}/follow`,
          {
            method: 'PUT',
            body: JSON.stringify({}),
          }
        );

        if (response.status === 200) {
          setIsFollowing(true);
          toast.success(`Følger ${profileName}`, {
            duration: 3000,
          });
        } else if (response.status === 400 && response.data?.errors[0]?.message === "You are already following this profile") {
          toast.success(`You are already following ${profileName}`, {
            duration: 3000,
          });
        } else {
          console.error('Error following the profile');
          toast.error('Error following the profile');
        }
      }
    } catch (error) {
      console.error('Error handling follow/unfollow:', error);
      toast.error('Error handling follow/unfollow');
    }
  };

  return (
  
    <Button variant={"outline"} onClick={handleFollowClick}>
    {isFollowing ? (
      <>
        Følger <UserCheck width={12} height={12}/>
      </>
    ) : (
      <>
        Følg <UserPlus width={12} height={12}/>
      </>
    )}
  </Button>
 
  );
};

export default FollowButton;
