import React from 'react';

interface Comment {
  comments: string;
  // Rename the property from 'body' to 'comments'
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <div key={index}>
          {/* Render the comments property */
          <p>Comments: {comment.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
