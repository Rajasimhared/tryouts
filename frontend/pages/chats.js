import React, { useEffect } from "react";

const Chats = () => {
  useEffect(() => {
    fetch(`http://localhost:4000/chats`)
      .then((response) => response.json())
      .then((data) => console.log(data));
    return () => {
      cleanup;
    };
  }, []);

  return <div>chats</div>;
};

export default Chats;
