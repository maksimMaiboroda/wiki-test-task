import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import type { ErrorModalProps } from './ErrorModal.types';

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
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
      role="alertdialog"
    >
      <DialogTitle data-testid="error-modal-title" id="error-modal-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText data-testid="error-modal-description" id="error-modal-description">
          {message || 'Unknown error. Please try again later.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseModal}
          color="primary"
          autoFocus
          aria-label="Close error dialog"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
