import React from 'react';
import { Paper, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import type { OnThisDayEvent } from '@services/types/wikiApi';

const ArticleItem = React.memo(({ article }: { article: OnThisDayEvent }) => (
  <Paper
    elevation={1}
    sx={{
      p: 4,
      width: '100%',
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 2,
    }}
  >
    <img
      srcSet={`${article.thumbnail?.source}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      src={`${article.thumbnail?.source}?w=164&h=164&fit=crop&auto=format`}
      alt={article.title}
      loading="lazy"
    />
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        {article.year} — {article.title ?? 'Untitled'}
        <Link
          href={article.contentUrl}
          target="_blank"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <LaunchIcon />
        </Link>
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {article.text}
      </Typography>

      {article.extract && (
        <Typography variant="body2" color="text.secondary">
          {article.extract}
        </Typography>
      )}
    </Box>
  </Paper>
));

export default ArticleItem;
