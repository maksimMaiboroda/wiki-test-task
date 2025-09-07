export type EventControlsProps = {
  onLoadEvents: (data: { month: number; day: number }) => Promise<void>;
  isLoading: boolean;
};
