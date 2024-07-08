import React from "react";
import Swal from "sweetalert2";

const EditHistoryPopUp = ({ records }) => {
  const handlePopup = () => {
    const editHistoryHTML = records
      .slice()
      .reverse()
      .map(
        (record) => `
          <div class="p-4 bg-gray-100 shadow-md rounded-md mb-6">
            <div class="flex items-left mb-2">
             
              <img
              class="w-10 h-10 rounded-full mr-4"
                      src="${
                        record.updatedByProfilePicUrl
                          ? `http://localhost:8080/${record.updatedByProfilePicUrl.replace(
                              /\\/g,
                              "/"
                            )}`
                          : ""
                      }"
                      alt=""
                    />
              <div class="text-left"> 
                <h3 class="text-lg font-semibold">${record.updatedByName}</h3>
                <p class="text-xsm text-gray-500">${
                  record.updatedByDesignation
                }</p>
              </div>
            </div>

            <div class="mt-2 mb-2 pl-10 text-left">
              <p class="text-gray-800">${record.changeDescription}</p>
            </div>
            <div class="text-right text-gray-500 text-sm">
              ${record.updateTime}
            </div>
          </div>
        `
      )
      .join("");

    Swal.fire({
      title: "Edit History",
      html: `<div>${editHistoryHTML}</div>`,
      showConfirmButton: false,
      customClass: {
        popup: "swal-wide", // Optional: custom class for wider popup
        title: "my-swal-title",
        confirmButton: "my-swal-confirm-button",
      },
      showClass: {
        popup: "swal2-noanimation", // Custom class to disable animation
      },
      hideClass: {
        popup: "", // Custom class to disable animation
      },
    });
  };
  return (
    <>
      <span
        className="  text-gray-700 cursor-pointer"
        onClick={records.length > 0 ? handlePopup : null}
      >
        <em> Edit-History </em>
      </span>
    </>
  );
};

export default EditHistoryPopUp;
