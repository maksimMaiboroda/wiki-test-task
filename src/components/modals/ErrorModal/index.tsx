import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

type ErrorModalProps = {
  openErrorModal: boolean;
  handleCloseModal: () => void;
  title: string;
  message: string | undefined;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  openErrorModal,
  handleCloseModal,
  title,
  message,
}) => {
  return (
    <Dialog
      open={openErrorModal}
      onClose={handleCloseModal}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          {message || 'Unknown error. Please try again later.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
