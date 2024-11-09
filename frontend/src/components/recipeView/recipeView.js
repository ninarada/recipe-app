import { Box, Card } from "@mui/material";
import { useParams } from 'react-router-dom';

const RecipeView = () => {
    const { id } = useParams();

    return (
        <Card sx={{
            width: "80%",
            minHeight: "80vh",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >

        </Card>
    )
}

export default RecipeView;