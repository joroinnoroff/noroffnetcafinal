import React from 'react';
import { remove } from '@/app/(auth)/(routes)/api/storage';
const signOut = () => {
 
  remove('token');

  window.location.href = '/';
};

const UserComponent = ({ authorName }) => {
  return (
    <div>
      <div>Welcome, {authorName}!</div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default UserComponent;
