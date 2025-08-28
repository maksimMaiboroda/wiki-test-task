import React from 'react';
import { Typography, Box, Container, Link } from '@mui/material';

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          This application was developed as a test assignment for a Front-End Developer position.
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Created by: Maksym Maiboroda
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Contact: <Link href="mailto:maksym.majboroda@gmail.com">maksym.majboroda@gmail.com</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
