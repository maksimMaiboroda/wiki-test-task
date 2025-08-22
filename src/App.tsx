import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '100vh' }} >
          <Button variant="outlined">Button</Button>
          <h1>Today's Wikipedia</h1>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
