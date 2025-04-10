import React from 'react';
import { Box, Typography } from '@mui/material';
import heroImg from '../assets/heroImg.jpg';

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '60vh', md: '75vh' }, 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, sm: 8 },
      }}
    >
      {/* Wrapper Box for Image Margin and Border Radius */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,  
          bottom: 0, 
          m: { xs: 2, sm: 4, md: 6 }, 
          borderRadius: '16px', 
          overflow: 'hidden', 
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={heroImg}
          alt="Culinary background"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)',
          }}
        />
      </Box>

      {/* Text Overlay */}
      <Box sx={{ zIndex: 1, maxWidth: '800px' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
            fontWeight: 700,
            mb: 2,
            textTransform: 'uppercase',
          }}
        >
          Explore
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.5rem' },
            fontWeight: 400,
          }}
        >
          Culinary Insights
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
