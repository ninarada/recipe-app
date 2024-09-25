import React from "react";
import { Button } from "@mui/material";

const PrimaryButton = ({ text, type, onClick, fontsize, disabled, icon }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled ? disabled : false}
      type={type || "button"}
      variant="contained"
      sx={{
        backgroundColor: "var(--primary-main-color)",
        "&:hover": {
          backgroundColor: "var(--primary-light-color)",
          color: "var(--primary-contrast-color)",
        },
        fontWeight: "500",
        borderRadius: "20px",
        fontSize:` ${fontsize}px`,
      }}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;