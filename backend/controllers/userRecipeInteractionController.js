const UserRecipeInteraction = require("../models/UserRecipeInteraction");
const Recipe = require("../models/Recipe");

const getInteraction = async (req, res) => {
    try {
        const { userId, recipeId } = req.query;

        if ( !userId || !recipeId ) {
            return res.status(400).json({ message: "Missing recipeId or userId" });
        }

        const interaction = await UserRecipeInteraction.findOne({ user: userId, recipe: recipeId });

        if (!interaction) {
            return res.status(404).json({ message: "Interaction not found." });
        }

        res.status(200).json(interaction);
    } catch (error) {
        console.error("Error retrieving user interaction:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateInteraction = async (req, res) => {
    try {
        const { userId, recipeId, caseName, value } = req.body;
        let interaction = await UserRecipeInteraction.findOne({ user: userId, recipe: recipeId });
        let recipe = await Recipe.findById(recipeId);

        if (interaction) {
            switch (caseName) {
                case 'liked':
                    interaction.liked = value;
                    if(value == true) {
                        recipe.like_counter++;
                    } else {
                        recipe.like_counter--;
                    }
                    break;
                case 'bookmarked':
                    interaction.bookmarked = value;
                    if(value == true) {
                        recipe.bookmark_counter++;
                    } else {
                        recipe.bookmark_counter--;
                    }
                    break;
                case 'rated':
                    if(value!== 0 && value!== null) {  //oznacio zvjezdicu
                        if(interaction.rating!==0) {  //ako je user vec glasao ali minja glas u drugi
                            //recipe.average_rating.count ostaje isti
                            recipe.average_rating.value = (recipe.average_rating.value*recipe.average_rating.count - interaction.rating + value)/recipe.average_rating.count;
                            interaction.rating = value;
                        }else {
                            recipe.average_rating.value = (recipe.average_rating.value*recipe.average_rating.count + value) / (recipe.average_rating.count+1);
                            recipe.average_rating.count++;
                            interaction.rating = value;
                        }
                    } else {     // ODznacio zvjezdicu
                        if((recipe.average_rating.count - 1 ) > 0) {
                            recipe.average_rating.value = (recipe.average_rating.value*recipe.average_rating.count - interaction.rating )/ (recipe.average_rating.count - 1);
                            recipe.average_rating.count--;
                            interaction.rating = 0;
                        } else {
                            recipe.average_rating.value = 0;
                            recipe.average_rating.count = 0;
                            interaction.rating = 0;
                        }
                        
                    }
                    break;
                default:
                    break;
            }
            await interaction.save();
            await recipe.save();
            res.status(200).json({
                interaction,
                average_rating: recipe.average_rating
            });
        }
    } catch (error) {
        console.error("Error updating interaction:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getInteraction,
    updateInteraction,
};