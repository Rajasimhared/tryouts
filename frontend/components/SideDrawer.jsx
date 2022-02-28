import {
  Box,
  Tooltip,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDropdown = Boolean(anchorEl);

  const [open, setOpen] = useState(show);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user } = ChatState();

  console.log(user);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.primary",
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Tooltip title="Search user to chat" arrow>
          <Button>
            <SearchIcon />
            <Typography sx={{ display: { xs: "none", md: "flex" }, px: 1 }}>
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <Typography variant="h3">Tryouts</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NotificationsIcon />
          <Button
            id="basic-button"
            aria-controls={openDropdown ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDropdown ? "true" : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <Avatar sx={{ bgcolor: "orange", mx: 1 }} src={user.pic}>
              {user.name.substring(0, 2).toUpperCase()}
            </Avatar>
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openDropdown}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                handleOpen();
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
          </Menu>
        </Box>
        <ProfileModal user={user} open={open} onClose={handleClose} />
      </Box>
    </>
  );
};

export default SideDrawer;
