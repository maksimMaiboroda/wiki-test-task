export type ErrorModalProps = {
  openErrorModal: boolean;
  handleCloseModal: () => void;
  title: string;
  message: string | undefined;
};
