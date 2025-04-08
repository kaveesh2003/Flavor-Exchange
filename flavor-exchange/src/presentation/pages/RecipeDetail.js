import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import RecipeData from '../components/RecipeData';
import {
  Typography,
  Box,
  Grid,
  Divider,
  Button,
  IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = RecipeData.find((item) => item.id === parseInt(id));
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const parseCookTimeToSeconds = (cookTime) => {
    const timePattern = /(?:(\d+)\s*hr)?\s*(?:(\d+)\s*min)?/i;
    const match = cookTime.match(timePattern);
    if (!match) return 0;
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    return hours * 3600 + minutes * 60;
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startTimer = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(parseCookTimeToSeconds(recipe.cookTime));
  };

  useEffect(() => {
    if (recipe) {
      const seconds = parseCookTimeToSeconds(recipe.cookTime);
      setTimeLeft(seconds);
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  }, [recipe]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      alert(' Time is up!');
    }
  }, [timeLeft, isRunning]);

  const handleFakeShare = () => {
    alert("This would normally share the recipe!");
  };

  if (!recipe) return <Typography>Recipe not found</Typography>;

  return (
    <Box padding={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{recipe.title}</Typography>
        <IconButton onClick={handleFakeShare}>
          <ShareIcon />
        </IconButton>
      </Box>

      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 12, marginTop: 16 }}
      />

      <Typography variant="body1" mt={2}>{recipe.description}</Typography>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Ingredients</Typography>
          <ul>
            {recipe.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Instructions</Typography>
          <ol>
            {recipe.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" alignItems="center" gap={2}>
        <AccessTimeIcon />
        <Typography>
          <strong>Cook Time:</strong> {recipe.cookTime}
        </Typography>
        <Box sx={{
          marginLeft: 'auto',
          backgroundColor: '#f5f5f5',
          padding: '6px 12px',
          borderRadius: '12px',
          fontWeight: 600
        }}>
          {formatTime(timeLeft)}
        </Box>
        {!isRunning ? (
          <Button onClick={startTimer} variant="outlined" color="success">
            Start Timer
          </Button>
        ) : (
          <Button onClick={stopTimer} variant="outlined" color="error">
            Stop Timer
          </Button>
        )}
      </Box>

      <Box mt={3}>
        <Button startIcon={<FavoriteBorderIcon />} color="secondary" variant="outlined">
          Save to Favorites
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeDetail;
