import React from 'react';
import { Paper, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import type { OnThisDayEvent } from '@services/types/wikiApi';

type ListArticlesPropsType = {
  articles: OnThisDayEvent[];
};

const ListArticles: React.FC<ListArticlesPropsType> = ({ articles }) => {
  return (
    <List>
      {articles?.map((item, idx) => {
        const key = item.pageId ?? `${item.year}-${idx}`;
        return (
          <ListItem key={key} sx={{ pl: 0, pr: 0 }}>
            <Paper elevation={1} sx={{ p: 4, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {item.year} — {item.title ?? 'Untitled'}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                {item.text}
              </Typography>

              {item.extract && (
                <Typography variant="body2" color="text.secondary">
                  {item.extract}
                </Typography>
              )}
            </Paper>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListArticles;
