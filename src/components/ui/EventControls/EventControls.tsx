import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import type { EventControlsProps } from './EventControls.types';
import { getTodayMD } from '@utils/index';

const EventControls: React.FC<EventControlsProps> = ({ onLoadEvents, isLoading }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
      Press the button to load today's articles:
    </Typography>

    <Button
      variant="contained"
      onClick={() => onLoadEvents(getTodayMD())}
      sx={{ mb: 2 }}
      loading={isLoading}
    >
      Load Events
    </Button>
  </Box>
);

export default EventControls;
