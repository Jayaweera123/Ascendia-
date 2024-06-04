import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-md mb-4">
      <div className="flex items-center mb-2">
        <img
          src={comment.profilePicUrl}
          alt={`${comment.commentedUserName}'s profile`}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{comment.commentedUserName}</h3>
          <p className="text-sm text-gray-500">{comment.designation}</p>
        </div>
      </div>
      <div className="mb-2">
        <p className="text-gray-800">
          <strong>Task:</strong> {comment.taskName}
        </p>
        <p className="text-gray-800">{comment.commentText}</p>
      </div>
      <div className="text-right text-gray-500 text-sm">
        {comment.commentDateTime}
      </div>
    </div>
  );
};

export default CommentCard;
