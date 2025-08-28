import React from 'react';
import { useGetArticleByTitleQuery } from '../../services/wikiApi';
import { CircularProgress, Typography } from '@mui/material';

type ListArticlesPropsType = {
  title: string;
};

const WikiArticle: React.FC<ListArticlesPropsType> = ({ title }) => {
  const { data, isLoading } = useGetArticleByTitleQuery(title);

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Typography variant="subtitle1" gutterBottom>
      {data?.extract}
    </Typography>
  );
};

export default WikiArticle;
