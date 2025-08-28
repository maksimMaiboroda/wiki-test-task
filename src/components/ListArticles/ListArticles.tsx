import React from 'react';
import { Paper, Typography } from '@mui/material';
import WikiArticle from './WikiArticle';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import type { WikiArticle as WikiArticleType } from '../../services/types/wikiApi';

type ListArticlesPropsType = {
  articles: WikiArticleType[];
};

const ListArticles: React.FC<ListArticlesPropsType> = (props) => {
  const { articles } = props;

  return (
    <List>
      {articles?.map((r) => (
        <ListItem key={r.pageid} sx={{ pl: 0, pr: 0 }}>
          <Paper elevation={1} sx={{ padding: 4 }}>
            <Typography variant="h6">{r.title}</Typography>
            <WikiArticle title={r.title} />
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default ListArticles;
