import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { MENU } from "@/content/menu";
import { useState } from "react";

const listImage = [
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg",
];

type TModalSelectImage = {
  open: boolean;
  onClose: () => void;
  onSave: (imgUrl: string) => void;
};

export default function ModalSelectImage({
  open,
  onClose,
  onSave,
}: TModalSelectImage) {
  const [selectedImg, setSelectedImg] = useState("");
  const handleClose = () => onClose();
  const handleOnSave = () => {
    onClose();
    onSave(selectedImg);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={(them) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          bgcolor: "background.paper",
          border: "2px solid #000000bf",
          borderRadius: 2,
          [them.breakpoints.down("lg")]: {
            width: 800,
          },
        })}
      >
        <Box
          sx={{
            px: 2,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose a banner
          </Typography>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={(theme) => ({
            p: 2,
            display: "grid",
            gridTemplateColumns: "repeat(5, 200px)",
            columnGap: 2,

            [theme.breakpoints.down("lg")]: {
              gridTemplateColumns: "repeat(4, 170px)",
            },
          })}
        >
          {listImage.map((image) => (
            <Box
              key={image}
              onClick={() => setSelectedImg(image)}
              sx={{
                backgroundImage: `url(${image})`,
                cursor: "pointer",
                border: `2px solid ${image === selectedImg ? "red" : "white"}`,
                width: 200,
                height: 120,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          ))}
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            p: 2,
          }}
        >
          <Button
            sx={{
              color: "black",
              textTransform: "inherit",
              fontWeight: "bold",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            sx={{
              background: "#FEF452",
              borderRadius: 2,
              color: "#942F70",
              textTransform: "inherit",
              fontWeight: "bold",
              "&:hover": { background: "#fef452b3" },
            }}
            onClick={handleOnSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
