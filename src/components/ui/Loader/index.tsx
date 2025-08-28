import React, { Fragment } from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

type LoaderPropsType = {
  isLoading: boolean;
};

const Loader: React.FC<LoaderPropsType> = (props) => {
  const { isLoading } = props;

  return (
    <Fragment>
      <Backdrop style={{ zIndex: 1000 }} open={isLoading}>
        <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
      </Backdrop>
    </Fragment>
  );
};

export default Loader;
