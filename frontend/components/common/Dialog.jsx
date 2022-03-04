import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomDialog({ user, children }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    children.props.close && children.props.close();
    setOpen(false);
  };

  return (
    <>
      {children && <span onClick={handleClickOpen}>{children}</span>}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "40%" },
            height: "40%",
            textAlign: "center",
            backgroundColor: "background.primary",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "3rem",
              pb: 3,
              fontWeight: "bold",
            }}
          >
            {user.name}
          </Typography>
          <Avatar
            src={user.pic || ""}
            alt="Profile picture"
            sx={{
              width: "150px",
              height: "150px",
            }}
          />
          <Typography
            sx={{
              fontSize: "2rem",
              pt: 4,
            }}
          >
            {user.email}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
