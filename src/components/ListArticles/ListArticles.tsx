// src/components/ListArticles/ListArticles.tsx
import React from 'react';
import { Paper, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import type { OnThisDayEvent } from '@services/types/wikiApi';

type ListArticlesPropsType = {
  articles: OnThisDayEvent[];
};

const ListArticles: React.FC<ListArticlesPropsType> = ({ articles }) => {
  return (
    <List data-testid="articles-list">
      {articles?.map((item, idx) => {
        const key = item.pageId ?? `${item.year}-${idx}`;
        return (
          <ListItem key={key} sx={{ pl: 0, pr: 0 }}>
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
                srcSet={`${item.thumbnail?.source}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.thumbnail?.source}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {item.year} — {item.title ?? 'Untitled'}
                  <Link
                    href={item.contentUrl}
                    target="_blank"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <LaunchIcon />
                  </Link>
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  {item.text}
                </Typography>

                {item.extract && (
                  <Typography variant="body2" color="text.secondary">
                    {item.extract}
                  </Typography>
                )}
              </Box>
            </Paper>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListArticles;
