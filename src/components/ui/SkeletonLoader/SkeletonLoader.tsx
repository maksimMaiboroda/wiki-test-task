import React from 'react';
import { Box, Paper, Skeleton } from '@mui/material';

const SkeletonLoader: React.FC = () => (
  <Box>
    {Array.from({ length: 3 }).map((_, index) => (
      <Paper key={index} elevation={1} sx={{ p: 4, mb: 2 }}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={100} sx={{ mt: 2 }} />
      </Paper>
    ))}
  </Box>
);

export default SkeletonLoader;
