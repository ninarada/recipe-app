import React from "react";
import { Button } from "@mui/material";

const SecondaryButton = ({ text, type, onClick, fontsize, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled ? disabled : false}
      type={type || "button"}
      variant="contained"
      sx={{
        backgroundColor: "var(--secondary-main-color)",
        "&:hover": {
          backgroundColor: "var(--secondary-light-color)",
          color: "var(--secondary-contrast-color)",
        },
        fontWeight: "500",
        borderRadius: "20px",
        fontSize: `${fontsize}px`,
      }}
    >
      {text}
    </Button>
  );
};

export default SecondaryButton;