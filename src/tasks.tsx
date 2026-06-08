export const getDateLabel = (date: number): string => {
  if (date === 0) return "Today";
  if (date < 0) return `${Math.abs(date)}d overdue`;
  return `${date}d left`;
};

export const getDaysLeft = (endDate: string, showString?: boolean): number | string => {
  const inputDateObject = new Date(endDate);
  inputDateObject.setHours(0, 0, 0, 0);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const differenceInMilliseconds = inputDateObject.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  return showString ? getDateLabel(differenceInDays) : differenceInDays;
};

export const getDaysClass = (dueDate: string): string => {
  const d = getDaysLeft(dueDate) as number;
  if (d < 0) return 'overdue';
  if (d === 0) return 'today';
  return '';
};
