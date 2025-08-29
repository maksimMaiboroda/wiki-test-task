import React, { useEffect, useState } from 'react';
import { useLazyGetOnThisDayEventsQuery } from '@/services/wikiApi';
import { Typography, Box, Container, Button } from '@mui/material';
import ErrorModal from '@/components/modals/ErrorModal';
import Loader from '@/components/ui/Loader';
import ListArticles from '@/components/ListArticles/ListArticles';
import { getTodayMD } from '@utils/index';

const HomePage: React.FC = () => {
  const [trigger, { data: events, isFetching, error }] = useLazyGetOnThisDayEventsQuery();
  const [openErrorModal, setOpenErrorModal] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenErrorModal(true);
      console.error({ error });
    }
  }, [error]);

  const handleClick = () => {
    trigger(getTodayMD());
  };

  const handleCloseModal = () => {
    setOpenErrorModal(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Typography variant="h1" gutterBottom>
          Wikipedia — On This Day
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Press the button to load today's articles:
        </Typography>

        <Button variant="contained" onClick={handleClick} sx={{ mb: 2 }} loading={isFetching}>
          Load Events
        </Button>

        {isFetching ? <Loader isLoading={isFetching} /> : <ListArticles articles={events || []} />}
      </Box>

      <ErrorModal
        title="Failed to Load Events"
        openErrorModal={openErrorModal}
        handleCloseModal={handleCloseModal}
        message="There was a problem fetching Wikipedia events. Please try again later."
      />
    </Container>
  );
};

export default HomePage;
