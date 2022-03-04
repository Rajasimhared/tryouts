import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

function UserListItem({ user, handleSelect }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        cursor: "pointer",
        p: 2,
        my: 0.5,
        backgroundColor: "background.paper",
        borderRadius: "5px",
        "&:hover": {
          backgroundColor: "background.default",
          opacity: [0.9, 0.8, 0.7],
          color: "background.primary",
        },
      }}
      onClick={handleSelect}
    >
      <Avatar alt="pic" src={user.pic} sx={{ mr: 2 }} />
      <Box>
        <Typography variant="h5">{user.name}</Typography>
        <Typography
          sx={{
            fontSize: "0.8rem",
          }}
        >
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
}

export default UserListItem;
