import React, { useEffect, useState } from 'react';
import { useLazyGetRecentChangesQuery } from '../../services/wikiApi';
import { Typography, Box, Container, Button } from '@mui/material';
import ErrorModal from '@/components/modals/ErrorModal';
import Loader from '@/components/ui/Loader';
import ListArticles from '@/components/ListArticles/ListArticles';

const HomePage: React.FC = () => {
  const [trigger, { data: recent, isFetching, error }] = useLazyGetRecentChangesQuery();
  const [openErrorModal, setOpenErrorModal] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenErrorModal(true);
      console.error({ error });
    }
  }, [error]);

  const handleClick = () => {
    trigger(15);
  };

  const handleCloseModal = () => {
    setOpenErrorModal(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Typography variant="h1" gutterBottom>
          Recent Wikipedia Changes
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Please, press to the button to get new articles:
        </Typography>
        <Button variant="contained" onClick={handleClick} loading={isFetching} sx={{ mb: 2 }}>
          Get Articles
        </Button>
        {isFetching ? <Loader isLoading={isFetching} /> : <ListArticles articles={recent || []} />}
      </Box>
      <ErrorModal
        title="Failed to Load Articles"
        openErrorModal={openErrorModal}
        handleCloseModal={handleCloseModal}
        message="There was a problem fetching the latest Wikipedia articles. Please try again later."
      />
    </Container>
  );
};

export default HomePage;
