import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const BackButton: React.FC = () => {
  return (
    <Link
      to={"boards"}
      id="back-button"
      style={{
        position: "absolute",
        bottom: "25px",
        left: "25px",
        zIndex: "1001",
      }}
    >
      <IconButton
        aria-label="back"
        sx={{
          height: "64px",
          width: "64px",
          bgcolor: "#8458b3",
          "&:hover": { bgcolor: "#5E229E" },
        }}
      >
        <ArrowBackIcon sx={{ fill: "#fff" }} />
      </IconButton>
    </Link>
  );
};
export default BackButton;
