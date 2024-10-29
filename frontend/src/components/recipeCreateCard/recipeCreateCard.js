import { Box, Card, Typography, useTheme } from "@mui/material";
import PrimaryButton from "../buttons/primaryButton";

const RecipeCreateCard = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: "80%",
        height: "80%",
      }}
    >
      <Box className="greeting-text">
        <Typography>Let's Get Cooking!</Typography>
        <Typography>
          Ready to share your culinary masterpiece? Fill in the details below to
          create a recipe that others will love!
        </Typography>
        <PrimaryButton text={'Create Your Recipe'} />
      </Box>
    </Card>
  );
};

export default RecipeCreateCard;
