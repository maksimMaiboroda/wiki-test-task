import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
] as const;

const MainLayout: React.FC = () => {
  const appBarHeight = 64;

  return (
    <>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Wikipedia This Day Articles
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Button key={item.path} component={Link} to={item.path} sx={{ color: '#fff' }}>
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: `${appBarHeight + 16}px`, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
