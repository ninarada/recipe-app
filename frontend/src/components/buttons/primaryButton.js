import React from "react";
import { Button, useTheme } from "@mui/material";

const PrimaryButton = ({ text, type, onClick, fontsize, disabled, icon }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      disabled={disabled || false}
      type={type || "button"}
      variant="contained"
      sx={{
        backgroundColor: theme.palette.deepOrange[200],
        color: "white",
        "&:hover": {
          backgroundColor: theme.palette.deepOrange[100],
          color: theme.palette.deepOrange[300],
        },
        fontWeight: 600,
        borderRadius: "50px",
        fontSize: `${fontsize}px`,
        padding: "5px 30px",
      }}
    >
      {icon}
      {text}
    </Button>
  );
};

export default PrimaryButton;
