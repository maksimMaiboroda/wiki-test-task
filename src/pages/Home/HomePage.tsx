import React from 'react';
import { Typography, Box } from '@mui/material';
import ErrorModal from '@/components/modals/ErrorModal/ErrorModal';
import ListArticles from '@/components/ListArticles/ListArticles';
import { useCachedEvents } from '@hooks/useCachedEvents';
import EventControls from '@ui/EventControls/EventControls';
import SkeletonLoader from '@ui/SkeletonLoader/SkeletonLoader';

const HomePage: React.FC = () => {
  const { events, isFetching, loadEvents, openErrorModal, closeErrorModal, errorMessage } =
    useCachedEvents();

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4, pl: { xs: 0, sm: 4 }, pr: { xs: 0, sm: 4 } }}>
      <Typography variant="h1" gutterBottom>
        Wikipedia — On This Day
      </Typography>

      <EventControls onLoadEvents={loadEvents} isLoading={isFetching} />

      {isFetching ? <SkeletonLoader /> : <ListArticles articles={events || []} />}

      <ErrorModal
        title="Failed to Load Events"
        openErrorModal={openErrorModal}
        handleCloseModal={closeErrorModal}
        message={errorMessage}
      />
    </Box>
  );
};

export default HomePage;
