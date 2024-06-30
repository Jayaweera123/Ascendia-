import React from "react";
import Swal from "sweetalert2";
import { MdOutlineComment } from "react-icons/md";

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
                    comment.profilePicUrlJob
                      ? `http://localhost:8080/${comment.profilePicUrlJob.replace(
                          /\\/g,
                          "/"
                        )}`
                      : ""
                  }"
                  alt=""
                />
          <div>
            <h3 class="text-lg font-semibold">${
              comment.commentedJobUserName
            }</h3>
            <p class="text-sm text-gray-500">${comment.designationJob}</p>
          </div>
        </div>
        <div class="mb-2">
         
          <p class="text-gray-800">${comment.commentJobText}</p>
        </div>
        <div class="text-right text-gray-500 text-sm">
          ${comment.commentJobDateTime}
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
      <div
        className="cursor-pointer flex"
        onClick={comments.length > 0 ? handlePopup : null}
      >
        <span className="text-md"> {comments.length} </span>
        <MdOutlineComment className="mx-2 w-6 h-6 text-gray-600" />
      </div>
    </>
  );
};

export default CommentCardPopup;
