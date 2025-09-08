import React from 'react';
import { Typography, Container } from '@mui/material';
import ErrorModal from '@/components/modals/ErrorModal';
import ListArticles from '@/components/ListArticles/ListArticles';
import { useCachedEvents } from '@hooks/useCachedEvents';
import EventControls from '@ui/EventControls/EventControls';
import SkeletonLoader from '@ui/SkeletonLoader/SkeletonLoader';

const HomePage: React.FC = () => {
  const { events, isFetching, loadEvents, openErrorModal, closeErrorModal } = useCachedEvents();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h1" gutterBottom>
        Wikipedia — On This Day
      </Typography>

      <EventControls onLoadEvents={loadEvents} isLoading={isFetching} />

      {isFetching ? <SkeletonLoader /> : <ListArticles articles={events || []} />}

      <ErrorModal
        title="Failed to Load Events"
        openErrorModal={openErrorModal}
        handleCloseModal={closeErrorModal}
        message="There was a problem fetching Wikipedia events. Please try again later."
      />
    </Container>
  );
};

export default HomePage;
