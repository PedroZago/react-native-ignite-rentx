import { format } from 'date-fns';

const formattedDate = (date: string | number | Date): string => {
  const newDate = format(new Date(date), 'dd/MM/yyyy');
  return newDate;
};

export { formattedDate };
