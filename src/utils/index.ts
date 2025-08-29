export const getTodayMD = (): { month: number; day: number } => {
  const today = new Date();
  return { month: today.getMonth() + 1, day: today.getDate() };
};
