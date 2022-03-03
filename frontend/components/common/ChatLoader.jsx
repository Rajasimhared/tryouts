import React from "react";
import { Box, Skeleton } from "@mui/material";

function ChatLoader() {
  return (
    <Box sx={{ width: 300 }}>
      {[...Array(10).keys()].map((value) => (
        <Skeleton animation="wave" height="45px" key={value} />
      ))}
    </Box>
  );
}

export default ChatLoader;
