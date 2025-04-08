import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import heroImg from '../assets/heroImg.jpg'; 

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '50vh', 
        width: '96%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        margin: '2rem',
        borderRadius: '10px'
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={heroImg}
        alt="Culinary background"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          filter: 'brightness(0.7)',
        }}
      />

      {/* Text Overlay */}
      <Box sx={{ maxWidth: '800px', px: 3 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
            fontWeight: 700,
            mb: 2,
            textTransform: 'uppercase',
          }}
        >
          Explore
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 400,
            mb: 4,
            fontStyle: 'italic',
          }}
        >
          Culinary Insights
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 2,
            fontSize: '1.1rem',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Discover More
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;