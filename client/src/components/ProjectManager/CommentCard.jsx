import React from "react";
import Swal from "sweetalert2";

const CommentCardPopup = ({ comments }) => {
  const handlePopup = () => {
    const commentCardsHTML = comments
      .slice()
      .reverse()
      .map(
        (comment) => `
      <div class="p-4 bg-gray-100 shadow-md rounded-md mb-4">
        <div class="flex items-center mb-2">
         
          <img
          class="w-10 h-10 rounded-full mr-4"
                  src="${
                    comment.profilePicUrl
                      ? `http://localhost:8080/${comment.profilePicUrl.replace(
                          /\\/g,
                          "/"
                        )}`
                      : ""
                  }"
                  alt=""
                />
          <div>
            <h3 class="text-lg font-semibold">${comment.commentedUserName}</h3>
            <p class="text-sm text-gray-500">${comment.designation}</p>
          </div>
        </div>
        <div class="mb-2">
         
          <p class="text-gray-800">${comment.commentText}</p>
        </div>
        <div class="text-right text-gray-500 text-sm">
          ${comment.commentDateTime}
        </div>
      </div>
    `
      )
      .join("");

    Swal.fire({
      title: "Comments",
      html: `<div>${commentCardsHTML}</div>`,
      showConfirmButton: false,
      customClass: {
        popup: "swal-wide", // Optional: custom class for wider popup
        title: "my-swal-title",
        confirmButton: "my-swal-confirm-button",
      },
    });
  };

  return (
    <>
      <span
        className="  text-gray-600 cursor-pointer"
        onClick={comments.length > 0 ? handlePopup : null}
      >
        {comments.length} <em> Comments </em>
      </span>
    </>
  );
};

export default CommentCardPopup;
