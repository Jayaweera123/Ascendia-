import React, { useEffect, useState } from "react";

function Example() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/users/8")
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        setUser(data); // Set user data
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <img
        src={
          user.profilePicUrl
            ? `http://localhost:8080/${user.profilePicUrl.replace(/\\/g, "/")}`
            : ""
        }
        className="w-50 h-50 rounded-full"
        alt={`Profile of ${user.firstName} ${user.lastName}`}
      />
      <p>{`http://localhost:8080/${user.profilePicUrl.replace(/\\/g, "/")}`}</p>
    </div>
  );
}

export default Example;
