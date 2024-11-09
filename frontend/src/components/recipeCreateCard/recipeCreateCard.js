import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import RecipeCreateGreeting from "./RecipeCreateGreeting";
import RecipeCreateTitle from "./RecipeCreateTitle";
import { Box, Card, Typography, useTheme } from "@mui/material";
import PrimaryButton from "../buttons/primaryButton";
import RecipeCreateIngredients from './RecipeCreateIngredients';
import RecipeCreateInstructions from './RecipeCreateInstructions';
import RecipeCreateAdditional from './RecipeCreateAdditional';
import RecipeCreateReview from './RecipeCreateReview';
import RecipeCreateSuccess from './RecipeCreateSuccess';

const RecipeCreateCard = () => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    <RecipeCreateGreeting onNext={() => setActiveStep((prev) => prev + 1)} />,
    <RecipeCreateTitle onNext={() => setActiveStep((prev) => prev + 1)} onPrev={() => setActiveStep((prev) => prev - 1)}/>,
    <RecipeCreateIngredients onNext={() => setActiveStep((prev) => prev + 1)} onPrev={() => setActiveStep((prev) => prev - 1)} />,
    <RecipeCreateInstructions onNext={() => setActiveStep((prev) => prev + 1)} onPrev={() => setActiveStep((prev) => prev - 1)} />,
    <RecipeCreateAdditional onNext={() => setActiveStep((prev) => prev + 1)} onPrev={() => setActiveStep((prev) => prev - 1)} />,
    <RecipeCreateReview onNext={() => setActiveStep((prev) => prev + 1)} onPrev={() => setActiveStep((prev) => prev - 1)} />,
    <RecipeCreateSuccess onNext={() => setActiveStep((prev) => prev + 1)} onPrev={() => setActiveStep((prev) => prev - 1)} />

  ];

  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <Card
      sx={{
        width: "80%",
        minHeight: "80vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideVariants}
          transition={{ duration: 0.2 }}
          style={{ width: "100%", height: '100%', display: 'flex', justifyContent: 'center' }}
        >
          {steps[activeStep]}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default RecipeCreateCard;
