import React from "react";
import { Button, useTheme } from "@mui/material";

const SecondaryButton = ({ text, type, onClick, fontsize, disabled }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      disabled={disabled || false}
      type={type || "button"}
      variant="contained"
      sx={{
        backgroundColor: theme.palette.orange[100],
        color: theme.palette.brown[300],
        "&:hover": {
          backgroundColor: theme.palette.orange[50],
          color: theme.palette.brown[300],
        },
        fontWeight: 600,
        borderRadius: "20px",
        fontSize: `${fontsize}px`,
        padding: "5px 30px",
      }}
    >
      {text}
    </Button>
  );
};

export default SecondaryButton;
