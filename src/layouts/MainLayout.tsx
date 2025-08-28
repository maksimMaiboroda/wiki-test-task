import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
] as const;

const MainLayout: React.FC = () => {
  return (
    <>
      <AppBar component="nav" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Wikipedia Latest Articles
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
